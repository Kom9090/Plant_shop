(()=>{var t=/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);$((function(){function e(t,e,n){$(t).on("click",(function(){$(e).toggleClass("_active"),n&&$(n).focus()})),$(document).on("click",(function(t){0===$(t.target).closest(e).length&&$(e).removeClass("_active")}))}t||$("body").addClass("_pc"),e(".search__btn",".search",".search__input"),e(".header__sign",".header__sign"),e(".select__btn",".select"),$(".slider").slick({fade:!0,prevArrow:$(".slick-prev"),nextArrow:$(".slick-next"),swipe:!1});var n=3,a=1,i=$(".top__slide-title"),r=$(i[n]).text(),o=$(i[a]).text(),c=i.length,s=$(".slick-arrow");$("._name-prev").text(r),$("._name-next").text(o),s.on("click",(function(){function t(t,e){var n=$(i[e]).text();$("._name-next").text(n);var a=$(i[t]).text();$("._name-prev").text(a)}$(this).hasClass("slick-next")?((a+=1)===c&&(a=0),(n+=1)===c&&(n=0),t(n,a)):((n-=1)<0&&(n=c-1),(a-=1)<0&&(a=c-1),t(n,a))})),$(window).on("scroll",(function(){var t=$(".header__wrapper"),e=$(".top").outerHeight()/2;$(window).scrollTop()>=e?t.addClass("_scrolling"):t.removeClass("_scrolling")})),t||$("._tt").on("mousemove",(function(t){$(this).children("._tt-content").show(),$("._tt-content").css("top",t.clientY+12).css("left",t.clientX+12)})).on("mouseout",(function(){$("._tt-content").hide()})),t&&$(".product__add-btn").addClass("_show-btn");var l=$("[data-popup]"),p=$("[data-close]");l.on("click",(function(t){t.preventDefault();var e=$(this).data("popup"),n=$(window).outerWidth()-$(".content").outerWidth();$(".popup._open").removeClass("_open"),$(e).addClass("_open"),$("body").addClass("_lock").css("padding-right",n),$(".header__wrapper").css("padding-right",n),setTimeout((function(){$(e).find(".popup__content").css("opacity",1)}),200)})),p.on("click",(function(t){t.preventDefault();var e=$(this).parents(".popup");e.find(".popup__content").css("opacity",0),setTimeout((function(){e.removeClass("_open"),$("body").removeClass("_lock").css("padding-right",0),$(".header__wrapper").css("padding-right",0)}),200)})),$(".popup").on("click",(function(){var t=$(this);t.find(".popup__content").css("opacity",0),setTimeout((function(){t.removeClass("_open"),$("body").removeClass("_lock").css("padding-right",0),$(".header__wrapper").css("padding-right",0)}),200)})),$(".popup__content").on("click",(function(t){t.stopPropagation()})),$(".select__option").on("click",(function(){var t=$(".select__text").text(),e=$(this),n=e.text();$(".select__text").text(n),e.text(t),"All"===n?$("[data-group]").show():function(t){$("[data-group]").hide(),$("[data-group]").each((function(){var e=$(this).data("group");t===e&&$(this).show()}))}(n),$(".select").removeClass("_active")})),$("._add-to-cart").on("click",(function(){var t=$(this);!function(t,e){if(!e.hasClass("_hold")){e.addClass("_hold");var n=$(".cart");if(e.hasClass("product__add-btn")){var a=e.parent().find(".product__img-wrapper"),i=e.parent().find(".product__name").text(),r=e.parent().find(".product__price").clone(!0).text((function(t,e){return e.replace("$","")})).text(),o=e.parent().find(".product__img").attr("src");u(a),d(o,i,r)}else{var c=e.parent().parent().find(".top__img-wrapper"),s=e.parent().find(".top__slide-title").text(),l=e.parent().find(".top__slide-price").clone(!0).text((function(t,e){return e.replace("$","")})).text(),p=e.parent().parent().find(".top__img").attr("src");u(c),d(p,s,l)}var _=$(".cart-item").length;function u(t){var a=t.clone(!0);a.addClass("_fly");var i=t.outerWidth()+"px",r=t.outerHeight()+"px",o=t.get(0).getBoundingClientRect().left+"px",c=t.get(0).getBoundingClientRect().top+"px";a.css({left:o,top:c,width:i,height:r}),e.parent().append(a);var s=n.get(0).getBoundingClientRect().left+"px",l=n.get(0).getBoundingClientRect().top+"px";a.css({left:s,top:l,width:"0px",height:"0px",opacity:"0"})}function d(e,n,a){""!=$(".modal-cart__empty").text()&&$(".modal-cart__empty").replaceWith('\n                    <div class="modal-cart__total-block total">\n                        <p class="total__info">Total price: <span class="total__price"></span>$</p>\n                        <button class="total__btn _link-btn" type="button">Checkout</button>\n                    </div>\n                    '),$(".modal-cart__list").append('\n                <li class="cart-item" data-id="'+t+'">\n                    <div class="cart-item__img-wrapper">\n                        <img class="cart-item__img" src="'+e+'" alt="kaktus">\n                    </div>\n                    <div class="cart-item__info">\n                        <h3 class="cart-item__title">'+n+'</h3>\n                        <span class="cart-item__price">'+a+'$</span> \n                        <div class="cart-item__quantity quantity">\n                            <button class="quantity__minus quantity__btn-n _no-active" type="button" aria-label="minus button">\n                                <span class="quantity__icon-minus"></span>\n                            </button>                                     \n                            <label class="quantity__label" for="number" aria-label="Quantity">\n                                <input class="quantity__input" type="number" name="number" id="number" placeholder="1" value="1">\n                            </label>                                        \n                            <button class="quantity__plus quantity__btn-n" type="button" aria-label="plus button">\n                                <span class="quantity__icon-plus" ></span>\n                            </button>\n                        </div>\n                        <button class="cart-item__delete" type="button">Delete from cart</button>\n                        <span class="cart-item__total-price">'+a+"$</span>\n                    </div>\n                    \n                </li>");var i=$(".total__price");i.text(String(Number(i.text())+Number(a)))}$(".cart__label").text(_).css("display","flex"),$("#tooltip-3").text("in cart "+_+" product(s)")}}(t.parent().data("id"),t)})),$(".modal-cart__list").on("click",(function(t){if($(t.target).hasClass("cart-item__delete")){var e=$(t.target),n=e.parent().data("id");e.parent().parent().remove();var a=$(document).find(".total__price"),i=e.parent().find(".cart-item__total-price").text((function(t,e){return e.replace("$","")})).text();a.text(String(Number(a.text())-Number(i)));var r=$(".cart__label"),o=$(".cart-item").length;$(".cart__label").text(o),$("#tooltip-3").text("in cart "+o+" product(s)"),0===o&&(r.css("display","none"),$("#tooltip-3").text("cart"),$(".total").replaceWith('<p class="modal-cart__empty">Your cart is empty</p>')),$("._add-to-cart").each((function(){var t=$(this).parent().parent().data("id");n!==t||$(this).removeClass("_hold")}))}}))})),$((function(){var t=$(".modal-cart__list");function e(){var t=$(document).find(".total__price"),e=$(document).find(".cart-item__total-price").clone(!0).text((function(t,e){return e.replace("$","")}));t.text("0"),e.each((function(){t.text(Number(t.text())+Number($(this).text()))}))}function n(t){t.parent().prev().removeClass("_no-active")}function a(t){t.parent().next().removeClass("_no-active")}t.on("focusout",(function(t){if(1===$(t.target).closest(".quantity__input").length){var i=$(t.target);i.val((function(t,e){return e.replace(/\D/g,"")}));var r=i.parent().parent().parent().find(".cart-item__price").clone(!0),o=i.parent().parent().parent().find(".cart-item__total-price");if(""===i.val()||i.val()<2)i.val("1"),function(t){t.parent().prev().addClass("_no-active")}(i),a(i),o.text(r.text()),e();else if(i.val()>10){i.val("10"),function(t){t.parent().next().addClass("_no-active")}(i),n(i);var c=r.text((function(t,e){return e.replace("$","")}));o.text(String(10*Number(c.text()))+"$"),e()}else{n(i),a(i);var s=r.text((function(t,e){return e.replace("$","")}));o.text(String(Number(s.text())*i.val())+"$"),e()}}})),t.on("click",(function(t){if(1===$(t.target).closest(".quantity__plus").length){var n=$(t.target),a=n.parent().parent().find(".cart-item__total-price"),i=n.parent().parent().find(".cart-item__price").clone(!0).text((function(t,e){return e.replace("$","")})),r=n.prev().children();n.parent().find(".quantity__minus").removeClass("_no-active"),r[0].stepUp(),10===Number(r.val())&&n.addClass("_no-active"),a.text(String(Number(r.val())*Number(i.text()))+"$"),e()}else if(1===$(t.target).closest(".quantity__minus").length){var o=$(t.target),c=o.parent().parent().find(".cart-item__total-price"),s=o.parent().parent().find(".cart-item__price").clone(!0).text((function(t,e){return e.replace("$","")})),l=o.next().children();o.parent().find(".quantity__plus").removeClass("_no-active"),l[0].stepDown(),1===Number(l.val())&&o.addClass("_no-active"),c.text(String(Number(l.val())*Number(s.text()))+"$"),e()}}))}))})();
//# sourceMappingURL=main.js.map
