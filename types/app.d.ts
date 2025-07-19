/**
 * Implement a type for all app states.
 *
 * @description This has has the following states:
 *  - `bluetoothSetup`: A bluetooth connection is not established. Scan and connect to a BLE device.
 *  - `sensorSetup`: Calibrate the sensor to before displaying measurements. This essentially tares the sensor.
 *  - `training`: After setup the device can be used for training. Here we display sensor data.
 */
type TAppState = "bluetoothSetup" | "sensorSetup" | "training";
