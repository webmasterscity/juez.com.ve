<?php
$in = fgets(STDIN);
$res = 0;
for($i=1; $i <= (int)$in; $i++){
$res = $res+$i;
}
echo $res; 
?>