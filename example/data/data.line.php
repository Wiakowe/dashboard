<?php

$data['values'] = [rand(10, 25), rand(10, 25), rand(10, 25), rand(10, 25), rand(10, 25), rand(10, 25)];
$data['value']  = rand(25, 55).'€';

echo json_encode($data);

