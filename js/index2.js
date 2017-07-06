$(document).ready(function () {
    var winWidth = $(window).width(),
        winHeight = $(window).height(),
        canScroll = true,
        scrollArr = [],
        maxWheelwidth,
        winScrollTop,
        body = $("html, body");

    var isSupportAnimate = $("html, body").css("animation") == undefined ? false : true;

    function size() {
        winWidth = $(window).width();
        winHeight = $(window).height();

        maxWheelwidth = winWidth > 1880 ? true : false;
        
        scrollArr = [
            Math.floor($(".banner").offset().top),
            Math.floor($(".intro").offset().top),
            Math.floor($(".schedule").offset().top),
            Math.floor($(".ticket").offset().top),
            Math.floor($(".footer").offset().top),
            // 地图，方便自然滚动切换导航样式的条件
            Math.floor($(".map").offset().top)
        ];

    }
    $(window).resize(function () {
        size();
    });
    size();

    setTimeout(function () {
        $(window).scrollTop(0);
    }, 100);

    function showIntro (num) {
        setTimeout(function () {
            $(".intro-item").eq(num).addClass("intro_animate");
            $(".intro-item").eq(num).on("animationend webkitAnimationEnd mozAnimationEnd", function () {
                $(this).removeClass("intro_animate hide");
            });
        }, (num + 1) * 200);
    }

    // 定义判断鼠标向上还是向下滑动的函数
    // function scrollFun (e) {
    //     var direct = null;      // 方向标识
    //     var ev = e || window.event;
    //     ev.preventDefault();        // 取消事件默认行为，否则快速回滚会造成闪烁
    //     if (ev.wheelDelta) {
    //         /* IE/Opera/Chrome中，如果wheelDelta > 0,则向上滚动，否则向下 */
    //         direct = ev.wheelDelta > 0 ? "up" : "down"
    //     } else if (ev.detail) {
    //         /* 火狐中，如果detail > 0,则向下滚动，否则向上，与Chrome相反 */
    //         direct = ev.detail > 0 ? "down" : "up"
    //     }
    //     pageSwitch(direct);
    // }
    // 给页面绑定鼠标滑轮滚动事件（火狐）
    if (document.addEventListener) {
        document.addEventListener("DOMMouseScroll", scrollFun, false);
    }
    // 滚动滑轮触发scrollFun方法
    window.onmousewheel = scrollFun;


    // 滚动切换导航样式的函数
    var isFinished = true;
    $(window).scroll(function () {
        winScrollTop = $(this).scrollTop();
        if (winWidth > 640) {
            if (winScrollTop > 0) {
                $(".nav").addClass("active");
            } else {
                $(".nav").removeClass("active");
                $(".nav-item").removeClass("active")
            }
            // scrollArr = [ $(".banner").offset().top, $(".intro").offset().top, $(".schedule").offset().top, $(".ticket").offset().top, $("footer").offset().top ];
            if (winScrollTop >= scrollArr[1] / 2 && winScrollTop < scrollArr[2] ) {
                $(".nav-item").eq(0).addClass("active").siblings().removeClass("active");
                if (isFinished && winWidth > 640 && isSupportAnimate) {
                    $(".intro-item").addClass("hide");
                    showIntro(0);
                    showIntro(1);
                    showIntro(2);
                }
                isFinished = false;
            } else if (winScrollTop >= scrollArr[2] && winScrollTop < scrollArr[3]) {
                isFinished = true;
                $(".nav-item").eq(1).addClass("active").siblings().removeClass("active");
            } else if (winScrollTop >= scrollArr[3] && winScrollTop < scrollArr[5]) {
                // console.log(winScrollTop, scrollArr[5])
                isFinished = true;
                $(".nav-item").eq(3).addClass("active").siblings().removeClass("active");
            } else if (winScrollTop >= scrollArr[5] - 200) {
                isFinished = true;
                $(".nav-item").eq(2).addClass("active").siblings().removeClass("active");
            } else {
                isFinished = true;
            }
        }
    });

    // 这里直接就是滚动的函数
    function scrollFun (e) {
        var ev = window.event || e;
        if (ev.preventDefault) {
            ev.preventDefault()
        } else {
            ev.returnValue = false;
        }
        var direct = null;      // 方向标识

        winScrollTop = $(window).scrollTop();

        if (ev.wheelDelta) {
            /* IE/Opera/Chrome中，如果wheelDelta > 0,则向上滚动，否则向下 */
            direct = ev.wheelDelta > 0 ? "up" : "down"
        } else if (ev.detail) {
            /* 火狐中，如果detail > 0,则向下滚动，否则向上，与Chrome相反 */
            direct = ev.detail > 0 ? "down" : "up"
        }
        // scrollArr = [ $(".banner").offset().top, $(".intro").offset().top, $(".schedule").offset().top, $(".ticket").offset().top, $("footer").offset().top, $(".map").offset().top ];
        if (canScroll) {
            canScroll = false;
            if (direct == "down") {
                if (winScrollTop >= scrollArr[0] && winScrollTop < scrollArr[1]) {
                    body.stop().animate({ scrollTop: scrollArr[1] }, 500, function () {
                        canScroll = true;
                    });
                } else if (winScrollTop >= scrollArr[1] && winScrollTop < scrollArr[2]) {
                    body.stop().animate({ scrollTop: scrollArr[2] }, 500, function () {
                        canScroll = true;
                    });
                } else if (winScrollTop >= scrollArr[2] && winScrollTop < scrollArr[3] && maxWheelwidth) {
                    body.stop().animate({ scrollTop: scrollArr[3] }, 500, function () {
                        canScroll = true;
                    });
                }
                // else if (winScrollTop >= scrollArr[3] && winScrollTop < scrollArr[4] && maxWheelwidth) {
                //     $(".nav-item").eq(2).addClass("active").siblings().removeClass("active");
                //     body.stop().animate({ scrollTop: scrollArr[4] }, 500, function () {
                //         canScroll = true;
                //     });
                // }
                else {
                    canScroll = true;

                    body.scrollTop(winScrollTop + 100);
                    // if (winScrollTop >= scrollArr[3] - 100 && winScrollTop < scrollArr[5]) {
                    //     $(".nav-item").eq(3).addClass("active").siblings().removeClass("active");
                    // } else if (winScrollTop >= scrollArr[5] - 80) {
                    //     $(".nav-item").eq(2).addClass("active").siblings().removeClass("active");
                    // }
                }
            } else if (direct == "up") {
                if (winScrollTop <= scrollArr[1]) {
                    body.stop().animate({ scrollTop: 0 }, 500, function () {
                        // $("nav").removeClass("active");
                        // $(".nav-item").eq(0).removeClass("active").siblings().removeClass("active");
                        canScroll = true;
                    });
                } else if (winScrollTop > scrollArr[1] && winScrollTop <= scrollArr[2]) {
                    body.stop().animate({ scrollTop: scrollArr[1] }, 500, function () {
                        canScroll = true;
                    });
                } else if (winScrollTop > scrollArr[2] && winScrollTop <= scrollArr[3] && maxWheelwidth) {
                    body.stop().animate({ scrollTop: scrollArr[2] }, 500, function () {
                        canScroll = true;
                    });
                }
                // else if (winScrollTop > scrollArr[3] && winScrollTop <= scrollArr[4] && maxWheelwidth) {
                //     $(".nav-item").eq(3).addClass("active").siblings().removeClass("active");
                //     body.stop().animate({ scrollTop: scrollArr[3] }, 500, function () {
                //         canScroll = true;
                //     });
                // }
                else {
                    canScroll = true;
                    body.scrollTop(winScrollTop - 100);
                    // if (winScrollTop > scrollArr[2] && winScrollTop <= scrollArr[3]) {
                    //     $(".nav-item").eq(1).addClass("active").siblings().removeClass("active");
                    // } else if (winScrollTop > scrollArr[3] && winScrollTop <= scrollArr[5] - 100) {
                    //     $(".nav-item").eq(3).addClass("active").siblings().removeClass("active");
                    // }
                }
            }
        }

    }

    // 菜单点击
    $(".nav-item").on("click", function () {
        $(".nav").addClass("active");
        canScroll = true;
        var idx = $(this).index();
        if (idx < 2) {
            // $(".nav-item").eq(idx).addClass("active").siblings().removeClass("active");
            body.stop().animate({
                scrollTop: scrollArr[idx + 1]
            }, 500)
        } else if (idx == 2) {
            // $(".nav-item").eq(2).addClass("active").siblings().removeClass("active");
            body.stop().animate({
                scrollTop: scrollArr[4]
            }, 500);
        } else if (idx == 3) {
            // $(".nav-item").eq(3).addClass("active").siblings().removeClass("active");
            body.stop().animate({
                scrollTop: scrollArr[3]
            }, 500);
        }

        if (winWidth < 640) {
            $(".hamburger").removeClass("hamburger-clicked");
            $(".nav").removeClass("active");
            $(".circle").removeClass("expand");
        }

    });
    // 汉堡菜单
    $(".hamburger").on("click", function () {
        if (!$(this).hasClass("hamburger-clicked")) {
            $(this).addClass("hamburger-clicked");
            $(".circle").addClass("expand");
            $(".nav").addClass("active");
        } else {
            $(this).removeClass("hamburger-clicked");
            $(".circle").removeClass("expand");
            $(".nav").removeClass("active");
        }
    })

    // banner 报名按钮
    $(".banner-apply-btn").on("click", function () {
        body.stop().animate({
            scrollTop: scrollArr[3]
        }, 500);
    });

    // 演讲嘉宾
    var introLists = $(".schedule-guest-intro");
    introLists.on("click", function () {
        var index = introLists.index(this);
        if (!$(this).hasClass("noconfirm")) {       // 不确定的嘉宾不能点，这里假设第一个嘉宾没确定，点击没反应
            $(".introduce-item").eq(index).css("display", "block").siblings(".introduce-item").removeAttr("style");
            $(".introduce").fadeIn(100);
            $(".wrapper").addClass("blur");
            $(".wrapper").css("-webkit-filter") == undefined ? $(".introduce-bg").addClass("compatibility-style") : false;
            $(".introduce-list").addClass("introduce-active");
            canScroll = false;
        }
    });
    $(".introduce-bg, .close-introduce").click(function () {
        $(".introduce-list").removeClass("introduce-active");
        $(".introduce").fadeOut(100);
        $(".wrapper").removeClass("blur");
        canScroll = true;
    });

    // 表单
    var hasTip = false,
        ticketCategory = $(".category-item"),
        ticketItem = $(".ticket-item"),
        idx = 0,
        oldIdx = 0,
        province = $("#ddlProvince"),
        city = $("#ddlCity"),
        otransitionend = "webkitTransitionEnd mozTransitionEnd transitionend";

    ticketCategory.on("click", function () {
        idx = $(this).index();
        if (idx != oldIdx) {
            $(this).addClass("ticket-choose").siblings().removeClass("ticket-choose");

            if (isSupportAnimate) {
                ticketItem.eq(idx).addClass("ticket-visible ticket-enter");
                ticketItem.eq(oldIdx).addClass("ticket-leave");

                ticketItem.eq(oldIdx).on(otransitionend, function () {
                    $(this).removeClass("ticket-leave active").off(otransitionend).siblings().removeClass("ticket-enter ticket-visible");
                    ticketItem.eq(idx).addClass("active");
                });
            } else {
                ticketItem.eq(idx).addClass("active").siblings().removeClass("active");
            }

            oldIdx = idx;
        }
    });

    var footerApplyItem = $(".footer-item-one .segmentation-item");
    footerApplyItem.on("click", function () {
        $(".nav-item").eq(3).addClass("active").siblings().removeClass("active");
        var index = $(this).index();
        ticketCategory.eq(index).trigger("click");
        body.stop().animate({
            scrollTop: scrollArr[3]
        }, 500);
    });

    function validate (ele) {
        hasTip = false;
        var attr = ele.attr("data-role");
        var formTips = (ele.nextAll(".form-tips").length != 0) ? ele.nextAll(".form-tips") : $("#txtAddress").nextAll(".form-tips");
        if (attr) {
            var role = eval(attr);
            var val = ele.val();
            if (role && role.length > 0) {
                if (!val || val.length == 0 || val == "0") {
                    if (!hasTip) {
                        formTips.html( (ele.is("select") ? "请选择" : "请输入") + role[0].name ).show();
                        hasTip = true;
                    }
                    return false;
                }
                if (role[0].reg && !eval(role[0].reg).test(val)) {
                    if (!hasTip) {
                        formTips.html(role[0].name + "格式不正确，请检查").show();
                        hasTip = true;
                    }
                    return false;
                }
            }
        }
        return true;
    }
    $(".ticket-item").on("click keyup",":input",function() {
        $(".form-tips").html("").removeAttr("style");
    });

    // province.on("change", function () {
    //     if ($(this).val() == "0") {
    //         city.find("option").remove().end().append("<option value='0'>所在城市</option>");
    //         $("#txtPostcode").val('');
    //     } else {
    //         $.post("/Api/GetCityList", { parentId: $(this).val() }, function (json) {
    //             if (json.Code == 0) {
    //                 var opts = '';
    //                 for (var i = 0; i < json.Data.length; i++) {
    //                     opts += '<option value="' + json.Data[i].Id + '" data-zip="' + json.Data[i].PostCode + '">' + json.Data[i].Name + '</option>';
    //                 }
    //                 city.find("option").remove().end().append(opts);
    //                 $("#txtPostcode").val(city.children(':selected').attr("data-zip"));
    //             }
    //         }, "json");
    //     }
    // });
    // city.on("change", function () {
    //     $("#txtPostcode").val($(this).children(':selected').attr("data-zip"));
    // }).change();

    //不需要发票
    $("#ddlInvoice").change(function () {
        if ($(this).val() == 0) {
            province.val(0);
            city.val(0);
            $("#txtAddress").val('');
            $("#txtPostcode").val('');
            $(".candisable").attr("disabled", "disabled");
        } else {
            $(".candisable").removeAttr("disabled");
        }
    });

    // 表单步骤切换函数
    function switchStep (ele) {
        var parentStep = ele.closest(".form-step");
        if (ele.hasClass("next-btn") || ele.hasClass("submit-vip") || ele.hasClass("submit-free")) {
            parentStep.addClass("ticket-leave").next().addClass("ticket-enter active");
            parentStep.on(otransitionend, function () {
                parentStep.removeClass("ticket-leave active").off(otransitionend).next().removeClass("ticket-enter");
            });
        } else if (ele.hasClass("prev-btn")) {
            parentStep.addClass("ticket-leave").prev().addClass("ticket-enter active");
            parentStep.on(otransitionend, function () {
                parentStep.removeClass("ticket-leave active").off(otransitionend).prev().removeClass("ticket-enter");
            });
        }
    }
    // VIP 票
    $("#ticket-vip").on("click", ".form-btn", function () {
        var catchErr = false;
        var _inputs1 = $("#ticket-vip .step-1 :input:not('button')");
        var _inputs2 = $("#ticket-vip .step-2 :input:not('button')");
        // 下一步
        if ($(this).hasClass("next-btn")) {
            _inputs1.each(function () {
                if (!validate($(this))) {
                    catchErr = true;
                    $(this).focus();
                    return false;
                }
            })
            if (catchErr) {
                return false;
            }
            switchStep($(this));
        }
        // 上一步
        if ($(this).hasClass("prev-btn")) {
            switchStep($(this));
        }
        // 提交
        if ($(this).hasClass("submit-vip")) {
            if ($("#ddlInvoice").val() != 0) {
                _inputs2.each(function () {
                    if (!validate($(this))) {
                        catchErr = true;
                        $(this).focus();
                        return false;
                    }
                })
            }
            if (catchErr) {
                return false;
            }
            var users = [{
                NameCn: $.trim(_inputs1.eq(0).val()),
                CompanyCn: $.trim(_inputs1.eq(1).val()),
                JobTitleCn: $.trim(_inputs1.eq(2).val()),
                Industry: _inputs1.eq(3).val(),
                Mobile: $.trim(_inputs1.eq(4).val()),
                Mail: $.trim(_inputs1.eq(5).val())
            }];
            var order = { InvoiceContent: $("#ddlInvoice").val(), InvoiceTitle: $.trim($("#txtInvoiceTitle").val()), Province: province.val(), City: city.val(), Address: $.trim($("#txtAddress").val()), Postcode: $.trim($("#txtPostcode").val()), Remark: $.trim($("#txtRemark").val()), UserList: users }
            console.log(order);
            $(this).text("提交中……").attr("disabled", true);

            switchStep($(this));
        }
    });

    // 免费票
    $("#ticket-free .form-btn").click(function () {
        var catchErr = false;
        var _inputs = $("#ticket-free .step-1 :input:lt(6):not('button')");
        console.log(_inputs)
        _inputs.each(function () {
            if (!validate($(this))) {
                catchErr = true;
                $(this).focus();
                return false;
            }
        });
        if (catchErr) {
            return false;
        }
        var users = [{
            NameCn: $.trim(_inputs.eq(0).val()),
            CompanyCn: $.trim(_inputs.eq(1).val()),
            JobTitleCn: $.trim(_inputs.eq(2).val()),
            Industry: _inputs.eq(3).val(),
            Mobile: $.trim(_inputs.eq(4).val()),
            Mail: $.trim(_inputs.eq(5).val())
        }];
        var btn = $(this);
        var order = { Remark: $.trim($("#free_Remark")), UserList: users }
        btn.val("提交中……").attr("disabled", true);
        // $.ajax({
        //     url: "/tday201702/OrderFree",
        //     type: "POST",
        //     dataType: "json",
        //     contentType: "application/json; charset=utf-8",
        //     data: JSON.stringify({ "order": order }),
        //     success: function (js) {
        //         if (js.Code == 0) {
        //             dSubmit(btn.parent().parent());
        //         } else {
        //             btn.val("提交").removeAttr("disabled");
        //             layer.alert("报名失败：" + js.Message);
        //         }
        //     },
        //     error: function (error) {
        //         btn.val("提交").removeAttr("disabled");
        //         layer.alert("出错了：" + error);
        //     }
        // });

        switchStep($(this));
        console.log("提交成功啦");
        return false;
    });

});
