function App() {
    return (
      <div className="container">
        <header className="title">
          <h1>Battle Pong Project</h1>
        </header>
  
        {/* Project Description */}
        <section className="section">

          <p className="lead">
            Welcome to our EEC172 Final Project webpage! Scroll down for
            details, video demos, and a bill of materials.
          </p>

          <h2>Project Description</h2>
            <p className="Description">
              Battle Pong reimagines the classic Pong arcade game with modern features, including real-time motion control, interactive obstacles, and a Wi-Fi enabled scoring system. Built as a standalone, plug-and-play experience using the CC3200 LaunchPad, the game integrates UART communication, accelerometer-based controls, and real-time gameplay mechanics.
            </p>
            <p className="Description">
              In this project, two players competed over a UART link while controlling their paddles with ADC-controlled joysticks. Players earned points by accurately positioning a dot on the screen, which could then be used to upgrade their paddle—enhancing launch power and unlocking additional abilities. Moreover, a unique gameplay element allowed players to shake the board to fire a cannon shot across the screen, instantly defeating an opponent if it hit.
            </p>
            <p className="Description">
              This project combined key embedded systems concepts such as interrupt-driven I/O, real-time physics updates, and bidirectional UART communication. Careful firmware design and debugging ensured responsive controls, smooth gameplay, and reliable interaction between the two CC3200 boards.
            </p>

          <ul>
            <li>
              <strong>Hardware Protocols:</strong> We use I2C to connect
              to an accelerometer for paddle motion, SPI for a display module,
              and a custom UART interface for debugging.
            </li>
            <li>
              <strong>Web Services:</strong> The score is pushed to a
              simple AWS IoT service so players can compare results.
            </li>
            <li>
              <strong>Sensing Devices:</strong> IR proximity sensor and
              accelerometer are included for interactive gameplay.
            </li>
          </ul>
        </section>

        <section className="Design">
          <h2>Design</h2>
          <ul>
          <strong>Functional Specifications:</strong>
          <img className="image"
            src="images/image1.png"
            alt="Functional Specifications"
          />
          </ul>
          <ul>
          <strong>System Architecture:</strong>
          <img className="image"
            src="images/image2.png"
            alt="System Architecture:"/>
            </ul>
          </section>
        {/* Video Demo */}
        <section className="section">
          <h2>Video Demo</h2>
          <p>
            Check out our short demo video showcasing the gameplay in action:
          </p>
          <div className="video-wrapper">
            {/* Replace "XYZ123" with your actual YouTube video ID or link */}
            <iframe
              src="https://www.youtube.com/embed/Qu3aiKrsQtc"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </section>
  
        {/* Implementation / System Architecture */}
        <section className="section">
          <h2>Implementation</h2>
          <p>
            Below is a simplified block diagram showing how the CC3200
            communicates with our sensors and external services:
          </p>
          <img
            src="images/system_diagram.png"
            alt="System Architecture"
            style={{ maxWidth: "100%", border: "1px solid #ccc" }}
          />
          <p className="mt-2">
            We manage input from the accelerometer for paddle movement,
            process collisions with obstacles, and handle networking tasks
            to update the leaderboard on AWS IoT.
          </p>
        </section>
  
        {/* Bill of Materials */}
        <section className="section">
          <h2>Bill of Materials</h2>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Part</th>
                <th>Quantity</th>
                <th>Cost (USD)</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CC3200 LaunchPad</td>
                <td>1</td>
                <td>$30</td>
                <td>
                  <a href="https://www.ti.com/tool/CC3200-LAUNCHXL">TI Store</a>
                </td>
              </tr>
              <tr>
                <td>Accelerometer (e.g. MPU-6050)</td>
                <td>1</td>
                <td>$5</td>
                <td>Amazon</td>
              </tr>
              <tr>
                <td>IR Sensor Module</td>
                <td>1</td>
                <td>$3</td>
                <td>Amazon/eBay</td>
              </tr>
              <tr>
                <td>Misc. Wires, Breadboard</td>
                <td>Several</td>
                <td>$5</td>
                <td>Lab Inventory</td>
              </tr>
              {/* Add more rows if needed */}
            </tbody>
          </table>
        </section>
  
        {/* Future Work / Conclusion */}
        <section className="section">
          <h2>Future Work</h2>
          <p>
            In the future, we hope to add two other buttons, one that can upgrade the scroll pad speed to make things more interesting and challenging
            in the later stages of the game. Another button would allow the user to repair the board they are playing on, which would also mean getting
            shot by a cannon doesn’t end the game but only breaks the scroll pad.
          </p>
          <p>
            Another thing we noticed while connecting the two boards through UART is that, sometimes due to noise in the circuit, the pong ball would get
            lost in the transfer process of going from one board to another through UART channel. To fix this problem, we can do a quick verification process 
            through UART, essentially after sending over the ball, the board waits for a confirmation from the other board, and if nothing is sent, then our 
            program would use a timer interrupt to send over the ball once again.
          </p>
        </section>
      </div>
    );
  }
  