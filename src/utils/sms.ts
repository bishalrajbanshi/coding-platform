import axios from 'axios';

export const sendSparrowSms = async ({
  to,
  message,
}: SmsPayload): Promise<void> => {
  try {
    const apiUrl = process.env.SPARROW_SMS_API_URL;
    if (!apiUrl) {
      throw new Error('SPARROW_SMS_API_URL environment variable is not set');
    }
    const res = await axios.post(apiUrl, null, {
      params: {
        token: process.env.SPARROW_SMS_TOKEN,
        from: process.env.SPARROW_SMS_FROM || 'SCHOOL',
        to,
        text: message,
      },
    });

    if (res.data && res.data.response_code === 200) {
      console.log('SMS sent successfully:', res.data);
    } else {
      console.error('Failed to send SMS:', res.data);
    }
  } catch (error) {
    console.error('Sparrow SMS error:', error);
  }
};
