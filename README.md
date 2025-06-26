# 🔫 Battle Pong  
*A modern, motion-controlled twist on the arcade classic—built from the ground up on TI’s CC3200 LaunchPad.*

[![Demo Video](https://img.shields.io/badge/Watch-Demo-blue?logo=youtube)](https://youtu.be/Qu3aiKrsQtc)
[![Project Page](https://img.shields.io/badge/Docs-Website-brightgreen?logo=github)](https://ayub-hanif.github.io/battle_pong_project/)

Welcome to our **EEC 172 Final Project**!  
Scroll down for an architectural tour, build instructions, BOM, and future-work ideas.

---

## Table of Contents
1. [Project Overview](#project-overview)  
2. [Key Features](#key-features)  
3. [Hardware Block Diagram](#hardware-block-diagram)  
4. [Firmware Architecture](#firmware-architecture)  
5. [AWS Leaderboard Pipeline](#aws-leaderboard-pipeline)  
6. [Build & Run](#build--run)  
7. [How to Play](#how-to-play)  
8. [Challenges & Lessons Learned](#challenges--lessons-learned)  
9. [Future Enhancements](#future-enhancements)  
10. [Bill of Materials](#bill-of-materials)  
11. [Authors](#authors)  

---

## Project Overview
**Battle Pong** re-imagines Pong as a head-to-head, *shake-to-shoot* duel:

* Two CC3200 LaunchPads communicate bidirectionally over **UART**.  
* Players steer their paddles with a **2-axis joystick** *and* the on-board **BMA222 accelerometer** (a quick board-shake fires a cannon).  
* **Interrupt-driven** I/O and a 60 Hz physics loop keep gameplay buttery-smooth.  
* Scores push to an **AWS IoT Core** shadow; an SNS rule emails the global leaderboard.

---

## Key Features
|                | Description |
|----------------|-------------|
| 🎮 **Real-time Motion Control** | Joystick (X-axis) + accelerometer tilt & shake |
| 🛰 **Bidirectional UART**       | Low-latency transfer of ball position, velocity & power-ups |
| 📺 **SPI OLED Graphics**        | 16 MHz SPI bursts via TI graphics lib (Adafruit-compatible) |
| 🛡 **Upgradeable Paddles**      | Spend points mid-match to lengthen paddle or boost shot power |
| 💥 **Cannon Shot**              | Shake to unleash an instant-KO projectile |
| ☁️ **Cloud Leaderboard**        | TLS 1.2 secure shadow updates → SNS → email |

---

## Hardware Block Diagram
```text
[ CC3200 #1 ]  <--UART-->  [ CC3200 #2 ]
     |                          |
  SPI OLED                  SPI OLED
     |                          |
 BMA222 I²C                BMA222 I²C
     |                          |
 Joystick → ADC            Joystick → ADC
     |                          |
  Button GPIO               Button GPIO
     |                          |
            Wi-Fi → AWS IoT Core
```

---

## AWS Leaderboard Pipeline
1. **Device shadow** (`update/accepted`) posts score JSON.  
2. **IoT Rule** SQL filters payload → **SNS Topic**.  
3. **SNS** emails a structured leaderboard entry.  

*Complete certificate-generation and flashing instructions live in
[`/docs/aws_setup.md`](https://ayub-hanif.github.io/battle_pong_project/).*

---

## Build & Run
```bash
# 1. Clone repo & open TI SysConfig
git clone https://github.com/ayub-hanif/battle_pong_project.git

# 2. Flash CC3200 (UniFlash)
make flash SPI_IF_BIT_RATE=16000000

# 3. Update Wi-Fi creds
edit common.h      # set SSID & PASS

# 4. Play!
```

### Pin-map quick-ref

| Function | Pin |
|----------|----:|
| OLED RST | 18  |
| OLED DC  | 63  |
| OLED CS  | 64  |
| SPI MOSI | 7   |
| SPI SCK  | 5   |
| UART TX  | 58  |
| UART RX  | 59  |
| Joystick | 60 (ADC CH0) |
| Button   | 15 (GPIO + INT) |

---

## How to Play
1. **Move paddle** — tilt joystick.  
2. **Shake** board to fire cannon (limited ammo).  
3. **Earn points** by scoring; press the **Upgrade** button anytime to  
   * enlarge paddle **or**  
   * boost launch power.  
4. First to **10 points** *(or last board standing)* wins!

---

## Challenges & Lessons Learned
* **ADC + Joystick Calibration** – Voltage alone (0 – 1.4 V) was ambiguous; we fused **time-domain sampling** from the FIFO to detect direction.  
* **AWS MQTT vs. UART** – The MQTT scheduler clashed with our real-time loop; a lean UART protocol proved far simpler.  
* **Refactoring for Testability** – Breaking monolith code into driver modules paid off in debugging speed.

---

## Future Enhancements
* **Speed & Repair Power-Ups** – Additional buttons for late-game chaos.  
* **Reliable Ball Handover** – Add UART ACK/NAK + retry to squash “lost-ball” edge cases.  
* **Web Dashboard** – Real-time leaderboard with charts and match replays.

---

## Bill of Materials
| Part | Qty | Cost (USD) | Source |
|------|----:|-----------:|--------|
| CC3200 LaunchPad | 2 | 2 × $47.99 | Digi-Key |
| 2-axis Joystick  | 2 | 2 × $5.95  | Digi-Key |
| Push-button      | 2 | 2 × $0.50  | Electro Maker |
| IR Proximity Sensor | 2 | $1.99 each | Amazon |
| Assorted Wires   | — | $5.97 | Amazon |
| **Total** |  | **≈ $120** | |

---

## Authors
**Raiyan Sazid** • **Mohammad Ayub Hanif Saleh**  
Questions or ideas? Open an issue or reach out!

---

> **Full documentation, schematics, and source code:**  
> https://ayub-hanif.github.io/battle_pong_project/

