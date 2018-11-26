define(function (require) {

    var Marionette = require('marionette');
    var PluginBroker = require('lib/plugin/PluginBroker');
    var PluginAbstract = require('lib/plugin/PluginAbstract');
    var LightBox = require('third-party-libs/lightbox/src/js/lightbox');

    return Marionette.Object.extend({

        initialize: function () {
            /**
             * please add your plugins and external libraries here here e.g.:
             *
             * var pluginBroker = PluginBroker.getInstance();
             * pluginBroker.addPlugin(new MyPlugin());
             *
             * but do not forget to define it before use.
             * You can use 'ext' alias path to require your files
             */
            this.listenTo(PluginBroker.getInstance(), 'group:render', this.addSliders);

            this.popups();
        },

        addSliders: function (view) {
            var input = jQuery('.input', view.$el);
            var slider = jQuery('.slider', view.$el);

            slider.slider({
                animate: true,
                max: input.data('max'),
                min: 1,
                value: input.val(),
                slide: function (event, ui) {
                    input.val(ui.value);
                    jQuery(ui.handle).text(ui.value);
                }
            });

            slider.slider('instance').handle.text(input.val());
        },

        popups: function () {

            var instance = this;


            //CART POPUP
            instance.handlePopup({
                trigger: '#header #sb_multiple_book_cart .cart',
                component: '#header #sb_multiple_book_cart .full-info',
                modal: false
            });

            // AVATAR INFO
            instance.handlePopup({
                trigger: '#header #sb_client_info .avatar',
                component: '#header #sb_client_info .full-info',
                modal: false
            });

            // TIMELINE TAB FULL INFO
            instance.handlePopup({
                trigger: '.tab.tab-with-popup .full-info-trigger',
                component: '.tab.tab-with-popup .full-info',
                modal: true,
                close_btn: '.tab.tab-with-popup .close-full-info'
            });

            // MOBILE NAV TRIGGER
            instance.handlePopup({
                trigger: '#header .nav-trigger',
                component: '#header .nav-wrapper',
                modal: true,
                close_btn: '#header .link'
            });
        },

        handlePopup: function (settings) {

            var popupTrigger = settings.trigger;
            var popupComponent = settings.component;
            var popupModal = settings.modal;
            var popupClose = settings.close_btn;

            $(document).on('click', popupTrigger, function (e) {
                var x = $(this).closest(':has(' + popupComponent + ')').find(popupComponent);
                x.toggleClass('active');
                if (popupModal) {
                    $('body').toggleClass('hasModal');
                }
            });
            $(document).on("click", function (e) {
                var isTrigger = $(e.target).closest(popupTrigger).length;
                var isComponent = $(e.target).closest(popupComponent).length;
                var isPopupClose = $(e.target).closest(popupClose).length;

                if (!isComponent && !isTrigger || isPopupClose) {
                    if ($(popupComponent).hasClass('active')) {
                        $(popupComponent).removeClass('active');
                        if (popupModal) {
                            $('body').removeClass('hasModal');
                        }
                    }
                }
            });
        }
    });

});