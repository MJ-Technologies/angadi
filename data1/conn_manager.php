<?php

$data = file_get_contents("php://input");

$objData = json_decode($data);

$event = $objData->event;
if($event == "login"){
$email = $objData->loginemail;
$pwd = $objData->loginpassword;

include 'conn.php';
$query = "select count(*) from customers where email='".$email."' and password='".$pwd."'";
$rs = mysql_query($query);
$row = mysql_fetch_row($rs);
$count = $row[0];

if($count > 0){
echo "success";
}else{
echo "failure";
}
}

// signup 

if($event == "signup"){
$name = $objData->name;
$phone = $objData->phone;
$email = $objData->email;
$address = $objData->address;
$password = $objData->password;

include 'conn.php';

$query = "INSERT INTO customers (`cid`, `name`, `email`, `address`, `phone`, `password`) VALUES (NULL, '$name', '$email', '$address', '$phone', '$password')";
$result = mysql_query($query);

if($result){
echo "success";
}else{
echo "failure";
}


}



// items search

if($event == "getItems"){
$type = $objData->type;

include 'conn.php';
if($type == NULL){
    $query = "select name,price,type from items";
}else{
    $query = "select name,price,type from items where type IN ( $type)";
}
$result=mysql_query($query);
$json = array();
while($row = mysql_fetch_array($result))     
 {
    $json[]= array(
       'name' => $row['name'],
     'price' => $row['price'],
     'type' => $row['type']
    );
}

$jsonstring = json_encode($json);
 echo $jsonstring;


}


// get types

if($event == "getTypes"){


include 'conn.php';
$query = "select distinct type from items order by 1";
$result=mysql_query($query);
$json = array();
while($row = mysql_fetch_array($result))     
 {
    $json[]= array(type=>$row['type']
    );
}

$jsonstring = json_encode($json);
 echo $jsonstring;


}

?>
