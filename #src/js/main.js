
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent);


//================================================================
$(function() {
    
    if (!isMobile) {   
        $("body").addClass("_pc"); // добавление класса документу, если вход не с мобильного устройства
    } 


//==========================функция добавления активного класса==================================


    function getActiveClass (class1, class2) {

             $(class1).on("click", function() {
                $(class2).toggleClass("_active");
            });
            $(document).on("click", function(e) {
                if($(e.target).closest(class2).length === 0) {
                    $(class2).removeClass("_active");
                }
            });
        
    }

    getActiveClass (".header__sign", ".header__sign"); //активация выпадающей кнопки входа
    getActiveClass (".select__btn", ".select"); //активация селекта
    

    $(".search__input").on("input", function() {
        const searhBtn = $(".search__btn");
        const searchInput = $(".search__input");
        if(searchInput.val() !== "") {
            searhBtn.on("click", function() {
                $(".modal-search").addClass("_open");
                setTimeout(function() {
                    $(".modal-search").find(".popup__content").css("opacity", 1);
                }, 200);
            });
            
        } 
    });

//===================================== слик слайдер ===========================


    $(".slider").slick({
        fade: true,
        prevArrow: $(".slick-prev"),
        nextArrow: $(".slick-next"),
        swipe: false
    });


 // добавление содержимого кнопкам слайдера

    let NUMBER_PREV = 3;
    let NUMBER_NEXT = 1;
    const titleArr = $(".top__slide-title");
    let textNamePrev = $(titleArr[NUMBER_PREV]).text();
    let textNameNext = $(titleArr[NUMBER_NEXT]).text();
    let titleLength = titleArr.length;
    let slickBtn = $(".slick-arrow");

    $("._name-prev").text(textNamePrev);
    $("._name-next").text(textNameNext);

    slickBtn.on("click", function() {
        let item = $(this);
        
        if (item.hasClass("slick-next")) {

            NUMBER_PREV += 1;
            NUMBER_NEXT += 1;
            if(NUMBER_NEXT === titleLength) {
                NUMBER_NEXT = 0;
            }
            if(NUMBER_PREV === titleLength) {
                NUMBER_PREV = 0;
            }
            
            changeButtonText(NUMBER_PREV, NUMBER_NEXT);
            

        } else {
            NUMBER_PREV -= 1;
            NUMBER_NEXT -= 1;
            if(NUMBER_PREV < 0) {
                NUMBER_PREV = titleLength - 1;
            }
            if(NUMBER_NEXT < 0) {
                NUMBER_NEXT = titleLength - 1;
            }

            changeButtonText(NUMBER_PREV, NUMBER_NEXT);
            
        }
        
        function changeButtonText(NUMBER_PREV, NUMBER_NEXT) {
            let nextText = $(titleArr[NUMBER_NEXT]).text();
            $("._name-next").text(nextText);

            let prevText = $(titleArr[NUMBER_PREV]).text();
            $("._name-prev").text(prevText);
        }
        
    });



//=================================Фиксированная шапка================================
    
    
    $(window).on("scroll", function() {

        const header = $(".header__wrapper");
        const top = $(".top").outerHeight()/2;


        const scrollDistance = $(window).scrollTop();
        
        if (scrollDistance >= top) {
            header.addClass("_scrolling");
        } else {
            header.removeClass("_scrolling");
        }
    }); 
 
//=================================tooltips=====================================

    if(!isMobile) {
        $("._tt").on("mousemove", function(e) {
                $(this).children("._tt-content").show();
                $("._tt-content").css('top', e.clientY + 12).css('left', e.clientX + 12);
            }).on("mouseout", function() {
                $("._tt-content").hide();
            });
    } 

//====== Отображение кнопки "добавить в корзину" на мобильных устройствах=============

    if (isMobile) {
        $(".product__add-btn").addClass("_show-btn");
    }


//==========================Попапы=================================


    
    const modalLink = $("[data-popup]");
    const modalClose = $("[data-close]");

    modalLink.on("click", function(e) {

        e.preventDefault();

        let item = $(this);
        let modalId = item.data("popup");
        
        const lockPaddingValue = $(window).outerWidth() - $(".content").outerWidth();
        $(".popup._open").removeClass("_open");
        $(modalId).addClass("_open");
        $("body").addClass("_lock").css("padding-right", lockPaddingValue);
        $(".header__wrapper").css("padding-right", lockPaddingValue);

        setTimeout(function() {
            $(modalId).find(".popup__content").css("opacity", 1);
        }, 200);
        if(modalId === "#searchModal") {
            $(".search__input").focus();
        }
        

    });
    
    modalClose.on("click", function(e) {

        e.preventDefault();

        let item = $(this);
        let modalParent = item.parents(".popup");
        
        modalParent.find(".popup__content").css("opacity", 0);
        
        setTimeout(function() {
           modalParent.removeClass("_open");
            $("body").removeClass("_lock").css("padding-right", 0);
            $(".header__wrapper").css("padding-right", 0); 
        }, 200);
        

    });

    $(".popup").on("click", function() {

        let item = $(this);
        item.find(".popup__content").css("opacity", 0);

        setTimeout(function() {
            item.removeClass("_open");
            $("body").removeClass("_lock").css("padding-right", 0);
            $(".header__wrapper").css("padding-right", 0);
        }, 200);

    });

    $(".popup__content").on("click", function(e) {

        e.stopPropagation();

    });



//========================Select==================================



    $(".select__option").on("click", function() {

        let selectBtnText = $(".select__text").text();
        let item = $(this);
        let itemText = item.text();
        $(".select__text").text(itemText);
        item.text(selectBtnText);
        if(itemText === "All") {
            $("[data-group]").show();
        } else {
            changeGoodsGroup(itemText);
        }
        $(".select").removeClass("_active");
        

    });
//==========================Sorting==============================

    function changeGoodsGroup(itemText) {

        $("[data-group]").hide();

        $("[data-group]").each(function() {
            let goodItem = $(this).data("group");

            if(itemText === goodItem) {
                $(this).show();
            }
        });
    }



//========================Add products to cart =====================


    //обработчик событий на кнопки "Добавить в корзину"
    $("._add-to-cart").on("click", function() {  
        let item = $(this);
        let productId = item.parent().data("id");
        addToCart(productId, item); //добавление товара в корзину    
    });

    function addToCart(productId, item) {

        if(!item.hasClass("_hold")) {

            item.addClass("_hold"); //отменяет повторное добавление в корзину

            const cartIcon = $(".cart"); // иконка корзины

            //если кнопка в блоке товаров
            if(item.hasClass("product__add-btn")) {
                const productImage = item.parent().find(".product__img-wrapper");
                const productName = item.parent().find(".product__name").text();
                const productPrice = item.parent().find(".product__price").clone(true).text(function(index, text) {
                    return text.replace("$", "");
                }).text();
                const productSrc = item.parent().find(".product__img").attr("src");
                flyImageToCart(productImage); //полет товара в корзину
                renderProduct(productSrc, productName, productPrice);
            } else { //если кнопка в главной секции
                const productImage = item.parent().parent().find(".top__img-wrapper");
                const productName = item.parent().find(".top__slide-title").text();
                const productPrice = item.parent().find(".top__slide-price").clone(true).text(function(index, text) {
                    return text.replace("$", "");
                }).text();
                const productSrc = item.parent().parent().find(".top__img").attr("src");
                flyImageToCart(productImage); //полет товара в корзину
                renderProduct(productSrc, productName, productPrice);
            }

            let cartNumber = $(".cart-item").length;
            
            $(".cart__label").text(cartNumber).css("display", "flex");
            $("#tooltip-3").text("in cart " + cartNumber + " product(s)");

            function flyImageToCart(productImage) {
                const productImageFantom = productImage.clone(true);
                productImageFantom.addClass("_fly");
                const productImageWidth = productImage.outerWidth() + "px";
                const productImageHeight = productImage.outerHeight() + "px";
                const productImageLeft = productImage.get(0).getBoundingClientRect().left + "px";
                const productImageTop = productImage.get(0).getBoundingClientRect().top + "px";
                productImageFantom.css({
                    left: productImageLeft,
                    top: productImageTop,
                    width: productImageWidth,
                    height: productImageHeight,
                });
                item.parent().append(productImageFantom);
                

                const cartFlyLeft = cartIcon.get(0).getBoundingClientRect().left + "px";
                const cartFlyTop = cartIcon.get(0).getBoundingClientRect().top + "px";
                productImageFantom.css({
                    left: cartFlyLeft,
                    top: cartFlyTop,
                    width: "0px",
                    height: "0px",
                    opacity: "0"
                });
            }

            function renderProduct(productImage, productName, productPrice) {
                
                if($(".modal-cart__empty").text() != "") {
                    $(".modal-cart__empty").replaceWith(`
                    <div class="modal-cart__total-block total">
                        <p class="total__info">Total price: <span class="total__price"></span>$</p>
                        <button class="total__btn _link-btn" type="button">Checkout</button>
                    </div>
                    `);
                }
                $(".modal-cart__list").append(`
                <li class="cart-item" data-id="` + productId + `">
                    <div class="cart-item__img-wrapper">
                        <img class="cart-item__img" src="` + productImage + `" alt="kaktus">
                    </div>
                    <div class="cart-item__info">
                        <h3 class="cart-item__title">` + productName + `</h3>
                        <span class="cart-item__price">` + productPrice + `$</span> 
                        <div class="cart-item__quantity quantity">
                            <button class="quantity__minus quantity__btn-n _no-active" type="button" aria-label="minus button">
                                <span class="quantity__icon-minus"></span>
                            </button>                                     
                            <label class="quantity__label" for="number" aria-label="Quantity">
                                <input class="quantity__input" type="number" name="number" id="number" placeholder="1" value="1">
                            </label>                                        
                            <button class="quantity__plus quantity__btn-n" type="button" aria-label="plus button">
                                <span class="quantity__icon-plus" ></span>
                            </button>
                        </div>
                        <button class="cart-item__delete" type="button">Delete from cart</button>
                        <span class="cart-item__total-price">` + productPrice + `$</span>
                    </div>
                    
                </li>`);

                let totallAll = $(".total__price");
                totallAll.text(String(Number(totallAll.text()) + Number(productPrice)));
            }
            
        }
    }

    const cartBody = $(".modal-cart__list");
    
    cartBody.on("click", function(e) {
        if($(e.target).hasClass("cart-item__delete")) {
            let item = $(e.target);
            let deleteId = item.parent().data("id");
            item.parent().parent().remove();
            
            let totallAll = $(document).find(".total__price");
            let thisPrice = item.parent().find(".cart-item__total-price").text(function(index, text) {
                return text.replace("$", "");
            }).text();
            totallAll.text(String(Number(totallAll.text()) - Number(thisPrice)));

            const cartLabel = $(".cart__label");
            let cartNumber = $(".cart-item").length;
            $(".cart__label").text(cartNumber);
            $("#tooltip-3").text("in cart " + cartNumber + " product(s)"); 
            if(cartNumber === 0) {
                cartLabel.css("display", "none");
                $("#tooltip-3").text("cart");
                $(".total").replaceWith(`<p class="modal-cart__empty">Your cart is empty</p>`);
            }
            
                
            $("._add-to-cart").each(function() {

                let goodItem = $(this).parent().parent().data("id");
                if(deleteId === goodItem) {
                   $(this).removeClass("_hold");
                   return;
                }
            });
            
        }          
    });

});
//=======================добавление колличества товара==============================

$(function() {

        const modalCart = $(".modal-cart__list"); //находим родителя блока кнопок
        const MAX_PRODUCTS = 10; //устанавливаем ограничение на максимальное колличество товаров

        modalCart.on("focusout", function(e) {
            if($(e.target).closest(".quantity__input").length === 1) {    //отлавливаем события при потери фокуса поля ввода
                
                let item = $(e.target);

                item.val(function(index, value) {       
                    return value.replace(/\D/g, "");    //запрещаем вводить символы кроме целых цифр
                });

                let priceInitial = item.parent().parent().parent().find(".cart-item__price").clone(true); //клонируем значение цены товара
                let priceTotal = item.parent().parent().parent().find(".cart-item__total-price"); 
                
                if (item.val() === "" || item.val() < 2) {
                    item.val("1");
                    hideMinus(item);
                    showPlus(item); 
                    priceTotal.text(priceInitial.text());
                    getTotalPrice();
                    

                } else if (item.val() > MAX_PRODUCTS) {
                    item.val("10");
                    hidePlus(item);
                    showMinus(item);
                    let priceInitialNew = priceInitial.text(function(index, text) {
                        return text.replace("$", "");
                    });
                    priceTotal.text(String(Number(priceInitialNew.text())*MAX_PRODUCTS) + "$");
                    getTotalPrice();
                } else {
                    showMinus(item);
                    showPlus(item);
                    let priceInitialNew = priceInitial.text(function(index, text) {
                        return text.replace("$", "");
                    });
                    priceTotal.text(String(Number(priceInitialNew.text())*item.val()) + "$");
                    getTotalPrice();
                }
            }
        });
        modalCart.on("click", function(e) {
            if($(e.target).closest(".quantity__plus").length === 1) {
                let item = $(e.target);
                let priceTotal = item.parent().parent().find(".cart-item__total-price");
                let priceInitial = item.parent().parent().find(".cart-item__price").clone(true);
                let priceInitialNew = priceInitial.text(function(index, text) {
                    return text.replace("$", "");
                });
                let input = item.prev().children();
                item.parent().find(".quantity__minus").removeClass("_no-active");
                input[0].stepUp();
                if (Number(input.val()) === MAX_PRODUCTS) {
                    item.addClass("_no-active");
                }
                
                priceTotal.text(String(Number(input.val()) * Number(priceInitialNew.text())) + "$");
                getTotalPrice();

            } else if ($(e.target).closest(".quantity__minus").length === 1) {
                let item = $(e.target);
                let priceTotal = item.parent().parent().find(".cart-item__total-price");
                let priceInitial = item.parent().parent().find(".cart-item__price").clone(true);
                let priceInitialNew = priceInitial.text(function(index, text) {
                    return text.replace("$", "");
                });
                let input = item.next().children();
                item.parent().find(".quantity__plus").removeClass("_no-active");
                input[0].stepDown();
                if (Number(input.val()) === 1) {
                    item.addClass("_no-active");
                } 
                
                priceTotal.text(String(Number(input.val()) * Number(priceInitialNew.text())) + "$");
                getTotalPrice();
            }
        });


        function getTotalPrice() {
            let totallAll = $(document).find(".total__price");
            let inputValue = $(document).find(".cart-item__total-price").clone(true);
            let inputValueNew = inputValue.text(function(index, text) {
                return text.replace("$", "");
            });
            totallAll.text("0");
            inputValueNew.each(function() {
                totallAll.text(Number(totallAll.text()) + Number($(this).text()));
            });
        }
        function hideMinus(item) {
            item.parent().prev().addClass("_no-active");
        }
        function hidePlus(item) {
            item.parent().next().addClass("_no-active");
        }
        function showMinus(item) {
            item.parent().prev().removeClass("_no-active");
        }
        function showPlus(item) {
            item.parent().next().removeClass("_no-active");
        }

});



//=================================Lazy loading==============================





