$(function(){
    var allCount = $(".p-status:contains()").length;
    var noCount = $(".p-status:contains(-)").length;
    var endCount = $(".p-status:contains(완료)").length;
    var ingCount = $(".p-status:contains(진행중)").length;

    var all_sum_count = allCount - noCount;

    var eCount = endCount / all_sum_count * 100;
    
    $(".pc-ing > span").text(ingCount);
    $(".pc-end > span").text(endCount);
    $(".pc-all>span").text(all_sum_count);
    $(".pc-percent>span").text(eCount.toFixed(0));

    $(".cl-table>tbody").each(function(){
        $(this).children().children("td.p-num").each(function(index){
            $(this).text(index + 1);
        });
    })

    $('a[href*="#"]')
        .not('a[href="#"]')
        .not('a[href="#0"]')
        .click(function(event){
            if(
                location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
                loaction.hostname == this.hostname
            ){
                var target = $(this.hash);
                target = target.length ? target  : $("[name=" + this.hash.slice(1)+"]");
                if (target.length) {
                    event.preventDefault();
                    $("htmnl, body").animate({
                        scrollTop: target.offset().top - stickyNavHeight
                    }, 300, function(){
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")){
                            return false;
                        }else {
                            $target.focus();
                        }
                    })
                }
            }
        });

    function onPreviewBtn(){
        var $btnPreview = $(".btn-preview");
        var $togglePreview = $btnPreview.find("span");
        var $framePreview = $(".frame-preview");
        var selectedPageLink = sessionStorage.getItem("link");

        function setIframeSrc(){
            var pageLinkText;
            $framePreview.find("iframe").attr("src", selectedPageLink);
            (selectedPageLink === null) ? pageLinkText = "filename을 클릭하세요": pageLinkText = selectedPageLink;
            $(".frame-page").attr("href", selectedPageLink).text(pageLinkText);
        }
        setIframeSrc();

        $(".p-link").on("click", function(e){
            if(!$btnPreview.hasClass("on")) return;
            e.preventDefault();
            selectedPageLink = $(this).text();
            sessionStorage.setItem("link",selectedPageLink);
            setIframeSrc();
        });

        $btnPreview.on("click", function(){
            if($btnPreview.hasClass("on")){
                $btnPreview.removeClass("on");
                $togglePreview.text("OFF");
                $framePreview.css({
                    right: -$framePreview.outerHeight()
                });
            }else{
                $btnPreview.addClass("on");
                $togglePreview.text("ON");
                $framePreview.css({
                    right: 0
                });
            }
        });

        $(".frame-sort select").on("change", function(){
            var splitValue = $(this).val().split("*");
            var widthValue = splitValue[0];
            var heightValue = splitValue[1];
            $(".frame-inner").css({
                width : widthValue,
                height : heightValue
            });
            $(".frame-size").text(widthValue + " × " + heightValue);
        })
    }
    onPreviewBtn();
});
