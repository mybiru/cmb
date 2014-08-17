<?

if(isset($_GET['android_json'])){

$data = json_decode(getdata('http://107.170.183.232:9200/resep/makananbayi/_search?size=20'), true);
$page = isset($_GET['p']) && is_numeric($_GET['p']) ? $_GET['p'] : 1;
$results = $data['hits']['total'];


$apkarray = array();
foreach($data['hits']['hits'] as $resepx){
$resep = $resepx['_source'];
$imgoo = ''.$site_url.'assets/foto/'.$resep['img']['imgfile'].'';


//bahan

$bahanapk .= '<ul>';
foreach($resep['bahanutama'] as $bahan){
$bahanapk .= '<li>'.$bahan['ukuran'].' '.$bahan['bahan'].'</li>';
}
$bahanapk .= '</ul>';



//cara

$__array = array(
'Pertama ', 
'Kemudian ',
'Selanjutnya ', 
'Kemudian ', 
'Lalu ', 
);



$caraapk .= '<ol>';
$i=0;
foreach($resep['caramasak'] as $caramasak){
if($__array[$i] <> ''){
$caraapk .= '<li>'.$__array[$i].''.strtolower($caramasak).'</li>';
}else{
$caraapk .= '<li>'.$caramasak.'</li>';
}
$i++;
}
$caraapk .= '</ol>';


//end

$apkarray[] = array(
'list_id' => $resep['id'],
"list_category_id" => "3",
"list_name" => ucwords(strtolower($resep['title'])),
"list_image" => 'assets/foto/'.$resep['img']['imgfile'].'',
"list_cook_time" => str_replace('M', ' menit', $resep['detail']['waktu_memasak']),
"list_summary" => $resep['intro'],
"list_ingredients" => $bahanapk,
"list_instruction" => $caraapk,
"list_date" => ''.($resep['post_time'] <> 0 ? gmdate('Y-m-d H:i:s', $resep['post_time']) : '').'', 
);	

}		

exit;
}