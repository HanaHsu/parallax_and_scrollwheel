= 視差和滾軸捲動調整
== 說明
滾軸捲動：
window.scrollTo(window.pageXOffset, window.pageYOffset - e.delta/5);
e.delta 的除數常數可以調整，設定滾輪下滑時的延遲程度。（常數越大，延遲的越慢）

視差（只支援上下移動）：
選取要綁定視差效果的元素，輸入設定值。
$('div#stage-1 .level-1').parallax({ "start": 0, "stop":430, "stop_point": 230 });

start：scroll 到定點時開始移動。
stop：scroll 到定點時結束移動。
（偵測目前 scrollTop 位置：console中輸入 windowTop 或是 $(window).scrollTop()）

stop_point：視差移動結束時，元素移動到的 top 位置。
