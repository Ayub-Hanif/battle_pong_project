function App() {
    return (
      <div className="container">
        <header className="title">
          <h1>Battle Pong Project</h1>
        </header>

        <p className="lead">
            Welcome to our EEC172 Final Project webpage! Scroll down for
            details, video demos, and a bill of materials.
        </p>
        {/* Project Description */}
        <section className="Project_Description">

        <h2 style={{ textAlign: "center", margin: "40px 0",  padding: "10px 0",  borderBottom: "1px solid #000000",
           }}>Project Description</h2>
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

        {/* Video Demo */}
        <section className="Video_Demo">
        <h2 style={{ textAlign: "center", margin: "40px 0",  padding: "10px 0",  borderBottom: "1px solid #000000",
           }}>Video Demo</h2>
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

        <section className="Design">
        <h2 style={{ textAlign: "center", margin: "40px 0",  padding: "10px 0",  borderBottom: "1px solid #000000",
           }}>Design</h2>
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

  
        {/* Implementation / System Architecture */}
        <section className="Implementation">
          <h2 style={{ textAlign: "center", margin: "40px 0",  padding: "10px 0",  borderBottom: "1px solid #000000",
           }}>
            Implementation
            </h2>
          <ul className="Oled_Interface">
            <h4>Part 1: Implement OLED interface using SPI</h4>
            <ul>
              <li>For the SPI interface to the OLED, you will need to use the interface signals shown in the table below.</li>
              <img src="images/image3.png"/>
              <li>Using the Sys Configuration tool from Texas Instruments, configure MOSI and SCK pins under SPI sections.</li>
              <li>Use PIN 18 for reset, PIN 63 for DC and PIN 64 for CS.</li>
              <li>When programming SPI communication configurations on your program, make sure to set SPI_IF_BIT_RATE to 16 MHZ for the fastest drawing capabilities.</li>
              <li>Choose any graphics library for drawing onto the board - we recommend using the Adafruit library for its simplicity and ease of use.</li>
            </ul>
          </ul>
          <ul className="I2C_communication">
            <h4>Part 2: Enable I2C communication</h4>
            <ul>
              <li>To use the Bosch BMA222 accelerometer and move the hit dot on the screen we must first enable I2C communication.</li>
              <li>Similar to part 1, use the Sys Configuration tool to configure I2C pins on your launchpad.</li>
              <li>Study the Bosch BMA222 Datasheet to understand how the acceleration sensor can be used.</li>
              <li>Ensure the correct jumper wires are connected on your CC3200 launchpad to communicate with the on board accelerometer.</li>
            </ul>
          </ul>

          <ul className="connection_joystick">
            <h4>Part 3: Connecting Joystick to ADC</h4>
            <ul>
              <li>To move the scroll pad for our project we will be using the joystick’s x axis.</li>
              <li>The demo program in the Texas SDK named adc has detailed instructions on how to use the on-board Analog-to-Digital converter pins.</li>
              <li>For this project, we will be using PIN 60 and its corresponding channel to connect and use our Joystick.</li>
            </ul>
          </ul>

          <ul className="UART_communication">
            <h4>Part 4: UART Communication</h4>
            <ul>
              <li>For sending the pong ball and cannon shots over to each board we will use UART1 communication channels to send over position and velocity data.</li>
              <li>For this project, we will be using PIN 58 for UART_TX and PIN 59 for UART_RX</li>
            </ul>
          </ul>

          <ul className="Configuring_buttons">
            <h4>Part 5: Configuring GPIO Buttons</h4>
            <ul>
              <li>To enable us to upgrade our board, we need to set up a GPIO pin and connect it up to a button.</li>
              <li>The circuit schematic for the button is as follows:</li>
              <img src="images/image4.png"/>
              <li>The GPIO pin should be connected to the positive edge, and in the program a GPIO Interrupt should be set to only on the rising edge.</li>
            </ul>
          </ul>

          <ul className="AWS_leaderboard">
            <h4>Part 6: Using AWS to set up leaderboard</h4>
            <p> </p>
            <strong>1. Setting Up an AWS Account and Accessing IoT Core:</strong>
            <ul>
              <li>Create an AWS account and log into the AWS Management Console.</li>
              <li>Navigate to AWS IoT Core, ensuring that the selected region supports the IoT Core service.</li>
              <li>Complete Amazon’s IoT interactive tutorial to understand IoT device management.</li>
            </ul>

            <p> </p>

            <strong>2. Creating and Configuring a Device Thing/Shadow:</strong>
            <ul>
              <li>Use the AWS IoT Console to create a new Thing (device representation in AWS).</li>
              <li>Configure the Thing with an unnamed shadow and generate a unique endpoint URL.</li>
              <li>Save the REST API endpoint for future API interactions.</li>
            </ul>

            <p> </p>
            <strong>3. Generating and Attaching Security Certificates:</strong>
            <ul>
              <li>Generate the required security certificates (private key, root CA certificate).</li>
              <li>Download and securely store these credentials, ensuring they are not lost.</li>
              <li>Attach the certificate to the Thing and configure IoT permissions.</li>
            </ul>

            <p> </p>
            <strong>4. Defining Access Policies for Device Shadow Operations:</strong>
            <ul>
              <li>Create a new AWS IoT policy allowing "iot:GetThingShadow" and "iot:UpdateThingShadow."</li>
              <li>Associate the policy with the generated certificate to enable authenticated API interactions.</li>
            </ul>

            <p> </p>
            <strong>5. Converting AWS Certificates to Compatible Formats:</strong>
            <ul>
              <li>Use OpenSSL (Version 1.1.1) to convert AWS-generated .pem certificates into .der format.</li>
              <li>Execute conversion commands in the appropriate environment (Windows or macOS).</li>
              <li>Organize the converted certificates for easy reference during flashing.</li>
            </ul>

            <p> </p>
            <strong>6. Updating CC3200 Firmware:</strong>
            <ul>
              <li>Verify the current firmware version on the CC3200 board.</li>
              <li>Use UniFlash (Windows) or cc3200tool (macOS) to update the service pack.</li>
              <li>Confirm the firmware update by checking version logs in the debug output.</li>
            </ul>

            <p> </p>
            <strong>7. Flashing Security Keys and Certificates to CC3200:</strong>
            <ul>
              <li>Use UniFlash to upload the .der formatted client certificate, private key, and root CA.</li>
              <li>Ensure proper file paths and naming conventions are followed for successful authentication.</li>
              <li>Verify file integrity post-upload using the List Files feature.</li>
            </ul>

            <p> </p>
            <strong>8. Establishing Secure Communication with AWS IoT:</strong>
            <ul>
              <li>Configure the CC3200 device to connect to AWS IoT using TLS 1.2 with appropriate ciphers.</li>
              <li>Implement RESTful API calls (GET and POST) to retrieve and update the device shadow.</li>
              <li>Modify common.h with correct SSID credentials for network connectivity.</li>
              <li>Ensure the system clock is updated in main.c to validate secure credentials.</li>
            </ul>
          </ul>

          <ul className="SNS_email">
          <h4>Part 7: Using SNS to Send a Message to Email</h4>
          <p> </p>
            <strong>1. Setting Up the SNS Topic and Subscription:</strong>
            <ul>
              <li>Navigate to AWS SNS under the Application Integration section.</li>
              <li>Create a new Standard Topic for message broadcasting.</li>
              <li>Subscribe to the SNS topic using an email protocol, entering an email address as the endpoint.</li>
              <li>Confirm the email subscription by following the link sent to the registered email.</li>
              <li>Publish a test message from the AWS console using the RAW format.</li>
            </ul>

            <p> </p>
            <strong>2. Creating an IoT Rule to Trigger SNS Notifications:</strong>
            <ul>
              <li>Navigate to the AWS IoT module and locate the Rules section.</li>
              <li>Create a new rule that listens to MQTT updates on the topic: $aws/things/thingName/shadow/update/accepted</li>
              <li>Configure the rule to filter messages based on the state.desired attribute.</li>
              <li>Attach an SNS action to the rule, selecting the previously created SNS topic.</li>
              <li>Assign an IAM role to grant AWS IoT permission to send messages via SNS.</li>
            </ul>

            <p> </p>
            <strong>3. Updating Device Shadow to Trigger Notifications:</strong>
            <ul>
              <li>Use the REST API to update the device shadow with a message payload.</li>
              <li>Observe the execution of the IoT rule and ensure an email notification is received.</li>
              <li>Modify the SNS message format using JSON to ensure structured output.</li>
            </ul>

            <p> </p>
            <strong>4. Formatting and Refining the Output:</strong>
            <ul>
              <li>Navigate to the SNS topic settings and experiment with the JSON message generator.</li>
              <li>Modify the SQL-like query statement in the IoT Rule to generate structured messages.</li>
              <li>Verify the formatted message output by testing with the AWS Console.</li>
              <li>make sure the SQL statement is updated to “SELECT VALUE CONCAT(things to be shown) FROM '$aws/things/yourthing/shadow/update/accepted'“ to cleanly display the message.</li>
            </ul>
          </ul>
        </section>

        <section className="Challenges">
          <h2 style={{ textAlign: "center", margin: "40px 0",  padding: "10px 0",  borderBottom: "1px solid #000000",
           }}>Challenges</h2>

            <p className="Description">
            The major challenges faced while completing this lab were getting the ADC setup with the joystick. You have to use FIFO to get time data as well as voltage data from the ADC PINS on the board.
             If the joystick is tilted to the left, the voltage drops from 1.4 to 0.7 and tilting to the right makes the voltage drop from 1.4 to 0.0, so the voltage by itself is not enough to figure out the tilt of the joystick module.
             For this we had to use time data to figure out when exactly the joystick is tilted to the right and use that data to configure how much the scroll pad should move on the screen.
            </p>

            <p className="Description">
            Another challenge we faced was when implementing the AWS MQTT system.
             After spending hours on it and getting it to publish and subscribe to topics, we realized it wasn’t so simple to use in our program.
              That's because the message query system uses scheduling to schedule different tasks on the board.
               Since we didn’t know how the internal scheduling worked, we weren’t able to schedule our game and the MQTT system properly.
             Which is why we made the call to go with UART to communicate between the boards instead of using MQTT.
             </p>

             <p className="Description">
             The other more conceptual challenges were refactoring major parts of our code to compartmentalize the program to be able to run things and debug more efficiently.
              Although it was challenging to implement as undergraduates, it saved us a significant amount of time in the long term.
             </p>
        </section>


        <section className="Future_Work">
          <h2 style={{ textAlign: "center", margin: "40px 0",  padding: "10px 0",  borderBottom: "1px solid #000000",
           }}>Future Work</h2>
            <p className="Description">
            In the future, we hope to add two other buttons, one that can upgrade the scroll pad speed to make things more interesting and challenging in the later stages of the game.
             Another button would allow the user to repair the board they are playing on, which would also mean getting shot by a cannon doesn’t end the game but only breaks the scroll pad.
            </p>
            <p className="Description">
            Another thing we noticed while connecting the two boards through UART is that, sometimes due to noise in the circuit, the pong ball would get lost in the transfer process of going from one board to another through the UART channel.
             To fix this problem, we can do a quick verification process through UART, essentially after sending over the ball, the board waits for a confirmation from the other board, and if nothing is sent, then our program would use a timer interrupt to send over the ball once again.
             </p>
        </section>
  
        {/* Bill of Materials */}
        <section className="Bill_of_Materials">
        <h2 style={{ textAlign: "center", margin: "40px 0",  padding: "10px 0",  borderBottom: "1px solid #000000",
           }}>Bill of Materials</h2>
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
                <td>$47.99</td>
                <td>
                  <a href="https://www.ti.https://www.digikey.com/en/products/detail/texas-instruments/CC3220S-LAUNCHXL/6695807/tool/CC3200-LAUNCHXL">Digi Key</a>
                </td>
              </tr>
              <tr>
                <td>2-axis joystick</td>
                <td>1</td>
                <td>$5.95</td>
                <td>
                  <a href="https://www.digikey.com/en/products/detail/adafruit-industries-llc/512/7056915">Digi Key</a>
                </td>
              </tr>
              <tr>
                <td>Pushbutton Switch</td>
                <td>1</td>
                <td>$0.50</td>
                <td>
                  <a href="https://www.electromaker.io/shop/product/momentary-pushbutton-switch-12mm-square?srsltid=AfmBOooC7bH8bDFUnYHD7odnyyBR-o4qopjPOh_KPgndrQih9CyytATA2CE&gQT=1">Electro Maker</a>
                </td>
              </tr>
              <tr>
                <td>Assorted Wires</td>
                <td>Several</td>
                <td>$5.97</td>
                <td>
                  <a href="https://www.amazon.com/California-JOS-Breadboard-Optional-Multicolored/dp/B0BRTJXND9/ref=asc_df_B0BRTHR2RL?mcid=b0d480e784aa3f86b7e873b50dbd35ff&tag=hyprod-20&linkCode=df0&hvadid=693363874255&hvpos=&hvnetw=g&hvrand=478299346480502350&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9032521&hvtargid=pla-2064166793246&th=1">Amazon</a>
                </td>
              </tr>
              {/* Add more rows if needed */}
            </tbody>
          </table>
        </section>


        <section class="Acknowledgements">
  <div class="rainbow-glow">
    <div class="card">
      <h3 class="title">created by:</h3>
      <div class="content">Mohammad Ayub Hanif Saleh and Raiyan Sazid</div>
    </div>
  </div>
</section>


      </div>
    );
  }
  