
process.env.NTBA_FIX_319 = 'test';

const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

TOKEN = ""

module.exports = async (request, response) => {
    try {
       
        const bot = new TelegramBot("6228337921:AAH2f5XJnJoPNgmid1pu2Hl6fbtJHRUN1rQ");
        
          

        const { body } = request;
        if (body.message) {
            
            const { chat: { id }, text } = body.message;
            const response = await axios.get('http://api.weatherapi.com/v1/current.json', {
            params: {
              key: "3f3331598a8d4dd1b6a191102232705",
              q: `${text}`,
              aqi: 'no'
            }

          });
          const markdownResponse = `
          *Weather Forecast 🛰️*
          _Location:_ ${text }📍
          _Temperature:_ **${response.data.current.temp_c}°C**🌡️
          _Condition:_  ${response.data.current.condition.text}

          *Additional Details*
          - Wind Speed: ${response.data.current.wind_kph}Km/h 💨
          - Humidity: ${response.data.current.humidity}%💧    
          - Visibility: ${response.data.current.vis_km} km 👀

          *Location Information*
          - Latitude: ${response.data.location.lat}🌍
          - Longitude: ${response.data.location.lon}🌍
          - Timezone: ${response.data.location.tz_id}🌐
          - Current Local Time: ${response.data.location.localtime}⏰
          `;
         
          await bot.sendMessage(id, markdownResponse, {parse_mode: 'Markdown'});
        }
    }
    catch(error) {
   
        console.error('Error sending message');
        console.log(error.toString());
    }
   
    response.send('OK');
};
