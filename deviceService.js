import DeviceInfo from 'react-native-device-info';

export const getDeviceDetails = async () => {
  try {
    const deviceName = await DeviceInfo.getDeviceName();
    const ipAddress = await DeviceInfo.getIpAddress();
    console.log("Fetched IP address: ", ipAddress);  // Log the IP to debug
    const model = DeviceInfo.getModel();
    return {
      deviceName,
      ipAddress: ipAddress || 'No IP address retrieved',
      model,
    };
  } catch (error) {
    console.error('Error fetching device details:', error);
    return {
      ipAddress: 'Error retrieving IP',
    };
  }
};
