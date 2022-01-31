<?php



$chat_id = "-1001774453449";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (!empty($_POST['name']) && !empty($_POST['wbe-tel'])) {
    if (isset($_POST['name'])) {
      if (!empty($_POST['name'])) {
        $name = strip_tags($_POST['name']);
        $nameFieldset = "Имя: ";
      }
    }

    if (isset($_POST['tel'])) {
      if (!empty($_POST['phone'])) {
        $phone = strip_tags($_POST['tel']);
        $phoneFieldset = "Телефон: ";
      }
    }
 
    $arr = array(
      $nameFieldset => $name,
      $phoneFieldset => $phone
    );
    foreach ($arr as $key => $value) {
      $txt .= "<b>" . $key . "</b> " . $value . "%0A";
    };
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");
  }
}
