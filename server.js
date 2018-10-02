const express = require('express');
const path = require('path');
const app = express();

const menu = 
   [
    {
      id: '1',
      title: 'Пицца',
      categories: [
        {
          title: 'Римская',
          dishes: [
            {
              title: 'Неаполь',
              fillers: [
                'сыр',
                'помидоры',
              ],
              price: 250
            },
            {
              title: 'qweqwe',
              fillers: [
                'сыр',
                'помидоры',
              ],
              price: 250
            },
          ],
        },
        {
          title: 'Обычная',
          dishes: [
            {
              title: 'Маргарита',
              fillers: [
                'сыр',
                'помидоры',
              ],
              price: 300
            },
          ],
        },
      ],
    },
    {
      id: '2',
      title: 'Роллы',
      dishes: [
        {
          title: 'Кабаяки',
          fillers: [
            'рыба',
            'рис',
          ],
          price: 250
        },
        {
          title: 'Нинзя',
          fillers: [
            'рыба',
            'рис',
          ],
          price: 250
        },
      ],

    },
  ];

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
	res.setHeader("Access-Control-Allow-Origin",  null);
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.get('/get-menu', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
	res.setHeader("Access-Control-Allow-Origin",  '*');
  res.json(menu);
});

const server = require('http').createServer(app).listen(process.env.PORT || 8080);