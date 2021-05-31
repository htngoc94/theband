$(function(){
	// tab
	$(".jsTab").jsTab(".jsTabList", ".jsTabCont", "li");
	//$(".jsTabMap").jsTab(".jsTabListMap", ".jsTabContMap", "area");
	$(".jsTabSecond").jsTab(".jsTabSecondList", ".jsTabSecondCont", "li");
	$(".jsAutoTab").jsTab(".jsAutoTabList", ".jsAutoTabCont", "li" , true);
	/*$(".tabId").jsTabTypeId(".jsListTab",".jsViewTab");*/
	// height full size
	$(".jsHeightMax").each(function(){
		var storageH = 0;
		$(this).find(".jsHeightMaxList").each(function(i){
			var h = $(this).height();
			storageH = Math.max(storageH, h);
		});
		$(this).find(".jsHeightMaxList").css("height", storageH);
	});
});

/**
 * [jsTab js 탭]
 * @param  {String}  list   [list 선택자]
 * @param  {String}  cont   [contents 선택자]
 * @param  {String}  target [click 이벤트가 일어나는 선택자]
 * @param  {Boolean} auto   [rolling auto]
 * @return {this}           [this]
 */
$.fn.jsTab = function(list, cont, target, auto) {
	if (!this.length) return false;
	this.each(function(){
		var $list = $(this).find(list + " " + target),
			$cont = $(this).find(cont),
			storagIdx = 0;

		$list.each(function(i){
			if ($(this).hasClass("on")) {
				$(this).children("a").attr('title','현재 선택 됨');
				storagIdx = i;
			}
		});

		// 자동 롤링
		if (auto === true) {
			var timer = null;
			$(this).on("mouseleave", autoStart).trigger("mouseleave");
			$(this).on("mouseenter", function(){
				clearInterval(timer);
				timer = null;
			});
		}
		function autoFun(){
			var _idx = storagIdx + 1;
			var _leg = $list.length;
			if (_idx >= _leg) {
				_idx = 0;
			}
			$list.eq(_idx).trigger("click");
		}
		function autoStart() {
			timer = setInterval(autoFun, 3000);
		}

		$cont.hide().eq(storagIdx).show();
		$list.on("click", function(){
			// 클래스가 no면 클릭하지 않음
			if ($(this).hasClass("no")) return false;
			// 앵커가 없다면 페이지 이동
			if (target === "area") {
				if ($(this).attr("href")[0] !== "#") return;
			} else {
				if ($(this).find("a").attr("href")[0] !== "#") return;
			}

			var _idx = $list.index(this);

			if (storagIdx === _idx) return false;

			$list.each(function(i){
				if ($(this).hasClass("on")) {
					$(this).removeClass("on");
					$cont.eq(i).hide();
					$(this).children().removeAttr('title');
				}
			});

			$(this).addClass("on");
			$cont.eq(_idx).show();
			$(this).children().attr('title','현재 선택 됨');

			var _$tblTable = $cont.eq(_idx).find(".tblColTxt01,.tblColData01");
			if (_$tblTable.length) {
				var _wit = _$tblTable.width();
				_$tblTable.find("table").css("width",_wit+1);
			}

			storagIdx = _idx;
			return false;
		});
	});
};