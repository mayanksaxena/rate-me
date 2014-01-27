/**
 * A JS/Jquery Plugin for Rating.
 * 
 * @author Mayank Saxena
 *
 * How To Use This: 
 * You Need to add the class 'rateme' on the content
 * this will show stars for your content after that
 * you can use data-type attr to define the content 
 * you want to rate.
 * 
 */
rateMe = {
    
    selector: '.rateme',

    _selector: '.rateme_plugin',

    starOn: './images/star-on.png',

    starOff: './images/star-off.png',

    ajaxURLToPost: './someURL/',

    init: function() {
        
        var _this = this;

        //Append Rating Stars for each selector.
        $(_this.selector).each(function() {
            $(this).after(_this.createSource());
        });

        User_Details = _this.getUserDetails();

        //Bind Events for Rate Me Plugin.
        $(_this._selector).find('img')
            .bind('mouseenter', function(e) {
                var obj = $(e.target);
                var index = $(e.target).attr('alt');
                for(i=1; i <= parseInt(index); i++) {
                    obj.parent().find("img:nth-child("+i+")").attr('src', _this.starOn);
                }
            }).bind('mouseleave', function(e) {
                var obj = $(e.target);
                for(i=1; i <= 5; i++) {
                    obj.parent().find("img:nth-child("+i+")").attr('src', _this.starOff);
                }
            }).bind('click', function(e) {
                var index = $(e.target).attr('alt');
                $(e.target).parent().find('img').unbind();
                var isDataType = '';
                if(typeof $(e.target).parent().prev().attr('data-type') !== "undefined") {
                    isDataType = $(e.target).parent().prev().attr('data-type');
                }
                $(e.target).parent().removeClass('rateme')
                    .append("Thank you for rating this content : " + $(e.target).attr('title'))
                    .unbind();

                //Post Rating of content.
                _this.postMyRating(index, User_Details, isDataType);                    
            });

    },

    getUserDetails: function() {
        return User_Details = {
            'Browser_CodeName': navigator.appCodeName,
            'Browser_Name': navigator.appName,
            'Browser_Version': navigator.appVersion,
            'Cookies_Enabled': navigator.cookieEnabled,
            'Browser_Language': navigator.language,
            'Browser_Online': navigator.onLine,
            'Platform': navigator.platform,
            'User_agent_header': navigator.userAgent,
            'User_agent_language': navigator.systemLanguage

        };
    },

    createSource: function() {
        return '<div class="rateme_plugin" style="cursor: pointer; width: 100px;">'+
                '<img src="./images/star-on.png" alt="1" title="bad">'+
                '<img src="./images/star-off.png" alt="2" title="poor">'+
                '<img src="./images/star-off.png" alt="3" title="regular">'+
                '<img src="./images/star-off.png" alt="4" title="good">'+
                '<img src="./images/star-off.png" alt="5" title="gorgeous">'+
                '</div>';
    },


    postMyRating: function(index, User_Details, isDataType) {
        var _this = this;
        //Post the details to server
        $.ajax({
            type: "POST",
            url: _this.ajaxURLToPost,
            data: { rating: index, user: User_Details, data_type: isDataType },
            success: function() {
                console.log("Do something with the response.");
            }
        });
    }



}