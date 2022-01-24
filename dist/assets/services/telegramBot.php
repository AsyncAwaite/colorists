<?php
$token = "2126668624:AAFayoUGaavmyCNYq7uveCj8vIGSMtM-nv8";

// $chat_id = "-504167134";
$chat_id = "-1001727429144";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (!empty($_POST['wbe-name']) && !empty($_POST['wbe-tel'])) {
    if (isset($_POST['wbe-name'])) {
      if (!empty($_POST['wbe-name'])) {
        $name = strip_tags($_POST['wbe-name']);
        $nameFieldset = "Ім'я: ";
      }
    }

    if (isset($_POST['wbe-tel'])) {
      if (!empty($_POST['phone'])) {
        $phone = strip_tags($_POST['wbe-tel']);
        $phoneFieldset = "Телефон: ";
      }
    }
    if (isset($_POST['"wbe-email'])) {
      if (!empty($_POST['"wbe-email'])) {
        $email = strip_tags($_POST['"wbe-email']);
        $emailFieldset = "email: ";
      }
    }

    $arr = array(
      $nameFieldset => $name,
      $phoneFieldset => $phone,
      $emailFieldset => $email
    );
    foreach ($arr as $key => $value) {
      $txt .= "<b>" . $key . "</b> " . $value . "%0A";
    };
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");
  }
}
