<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

// Вычисляем дату: сегодня минус 10 дней
$from = date('Y-m-d', strtotime('-10 days')); 

$apiKey = '100fa1dec0c3431d9c077a51cd9e49a7';
$query = 'business';

// Собираем URL с динамической датой
$url = "https://newsapi.org/v2/everything?q=" . urlencode($query) . 
       "&from=" . $from . 
       "&sortBy=popularity&language=ru&pageSize=10&page=1&apiKey=" . $apiKey;

// Для NewsAPI обязательно нужно передать User-Agent, иначе сервер может отклонить запрос
$options = [
    "http" => [
        "header" => "User-Agent: MyPHPApp/1.0\r\n"
    ]
];

$context = stream_context_create($options);

$response = file_get_contents($url, false, $context);

if ($response === FALSE) {
    die("Ошибка при получении данных.");
}

// Декодируем JSON в массив
$data = json_decode($response, true);

// Выводим результат (например, заголовок первой статьи)
echo json_encode(['articles' => $data['articles']]);
?>