(function(a) {
    a.chat = function() {
        var $body = a("body");
        var $base;
        var $maintenance;
        var $show_bar_button;
        var $popout_chat_button;
        var $optionsbutton;
        var $optionsbutton_popup;
        var $modbutton;
        var $modbutton_popup;
        var $chatrooms_button;
        var $buddy_list_tab;
        var $userstab_popup;
        var $tooltip = null;
        var $tooltip_content;
        var $chatroom_chat;
        var $chatroom_room_list;
        var $chatrooms_popup;
        var $chatroom_create;
        var $chatroom_create_flyout;
        var $application_buttons = {};
        var $application_button_popups = {};
        var $applications_button;
        var $applications_button_popup;
        var $applications_button_popups;
        var $users = [];
        var $user_popups = [];
        var $chatbox_right;
        var $chatboxes;
        var $chatboxes_wide;
        var $chatbox_left;
        var $chatroom_admin_controls = "";

        function addHover($elements, classes) {
            $elements.each(function(i, element) {
                a(element).hover(function() {
                    a(this).addClass(classes);
                }, function() {
                    a(this).removeClass(classes);
                });
            });
        }

        function preventScrolling($target) {
            $target.bind("mousewheel DOMMouseScroll", function(e) {
                var e0 = e.originalEvent,
                    delta = e0.wheelDelta || -e0.detail;
                this.scrollTop += (delta < 0 ? 1 : -1) * 30;
                e.preventDefault();
            });
        }

        function showLoading($element) {
            a(".chat_hide_loading", $element).hide();
            a(".chat_show_loading", $element).show();
        }

        function hideLoading($element) {
            a(".chat_hide_loading", $element).show();
            a(".chat_show_loading", $element).hide();
        }

        function closePopup($popup, $button, hidden) {
            if ($popup !== undefined) {
                if (hidden == 1) {
                    $popup.addClass("chat_tabopen_hidden");
                } else {
                    $popup.removeClass("chat_tabopen");
                }
            }
            if ($button !== undefined) {
                $button.removeClass("chat_tabclick chat_userstabclick chat_trayclick chat_usertabclick");
            }
        }

        function hideTooltip() {
            if ($tooltip) {
                $tooltip.hide();
            }
        }

        function showTooltip($target, text, is_left, custom_left, custom_top, is_sideways) {
            if ($tooltip === null) {
                $tooltip = a("<div id=\"chat_tooltip\"><div class=\"chat_tooltip_content\"></div></div>").appendTo($body);
                $tooltip_content = a(".chat_tooltip_content", $tooltip);
            }
            $tooltip_content.html(text);
            var target_offset = $target.offset();
            var target_width = $target.width();
            var target_height = $target.height();
            var tooltip_width = $tooltip.width();
            if (!custom_left) {
                custom_left = 0;
            }
            if (!custom_top) {
                custom_top = 0;
            }
            if (is_left) {
                $tooltip.css({
                    top: target_offset.top - a(window).scrollTop() - target_height - 5 - custom_top,
                    left: target_offset.left + target_width - 16 - custom_left,
                    display: "block"
                }).addClass("chat_tooltip_left");
            } else if (is_sideways) {
                $tooltip.css({
                    top: target_offset.top - a(window).scrollTop() - target_height - 5 - custom_top,
                    left: target_offset.left + target_width - tooltip_width + 18 - custom_left,
                    display: "block",
                    'background-position': tooltip_width - 128 + "px -58px"
                }).removeClass("chat_tooltip_left");
            } else {
                $tooltip.css({
                    top: target_offset.top - a(window).scrollTop() - target_height - 5 - custom_top,
                    left: target_offset.left + target_width - tooltip_width + 18 - custom_left,
                    display: "block",
                    'background-position': tooltip_width - 23 + "px -114px"
                }).removeClass("chat_tooltip_left");
            }
            if (W) {
                $tooltip.css("position", "absolute");
                $tooltip.css("top", parseInt(a(window).height()) - parseInt($tooltip.css("bottom")) - parseInt($tooltip.height()) + a(window).scrollTop() + "px");
            }
        }
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

        function replaceURLWithHTMLLinks(text) {
            return text.replace(exp, "<a href='$1' target='_blank'>$1</a>");
        }
        RegExp.escape = function(text) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        };

        function smileyreplace(mess) {
            if (c_disable_smilies != 1) {
                for (i = 0; i < Smiley.length; i++) {
                    var smiley_test = Smiley[i][1].replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    var check_emoticon = mess.lastIndexOf(smiley_test);
                    if (check_emoticon != -1) {
                        mess = mess.replace(new RegExp(RegExp.escape(smiley_test), "g"), "<img class=\"chat_smiley\" src=\"" + c_ac_path + "themes/" + u_theme + "/images/smilies/" + Smiley[i][0] + ".png\" alt=\"\" />");
                    }
                }
            }
            return mess;
        }

        function chatroomKeydown(key, $element) {
            if (key.keyCode == 13 && key.shiftKey == 0) {
                var i = $element.val();
                i = i.replace(/^\s+|\s+$/g, "");
                $element.val("");
                $element.css("height", "18px");
                $element.css("overflow-y", "hidden");
                $element.focus();
                if (c_send_room_msg == 1 && i != "") {
                    displayMessage("chat_chatroom_message_flyout", lang[209], "error");
                } else {
                    i != "" && a.ajax({
                        url: c_ac_path + "includes/json/send/send_message_chatroom.php",
                        type: "post",
                        cache: false,
                        dataType: "json",
                        data: {
                            userid: u_id,
                            username: u_name,
                            chatroomid: Ccr,
                            message: i
                        },
                        beforeSend: function() {
                            a(".chat_chatroom_message_input").addClass("chat_message_sending");
                        },
                        error: function() {
                            a(".chat_chatroom_message_input").removeClass("chat_message_sending");
                            displayMessage("chat_chatroom_message_flyout", lang[135], "error");
                        },
                        success: function(o) {
                            a(".chat_chatroom_message_input").removeClass("chat_message_sending");
                            if (o) {
                                var no_error = true;
                                o && a.each(o, function(i, e) {
                                    if (i == "error") {
                                        a.each(e, function(l, f) {
                                            no_error = false;
                                            displayMessage("chat_chatroom_message_flyout", f.m, "error");
                                        });
                                    }
                                });
                                if (no_error) {
                                    addMessageToChatroom(o, u_name, i);
                                    $chatroom_chat.scrollTop($chatroom_chat[0].scrollHeight);
                                }
                            }
                        }
                    });
                }
                return false;
            }
        }

        function userchatKeydown(key, $element, typing, jabber) {
            if (jabber != 1) {
                clearTimeout(pa);
                pa = setTimeout(function() {
                    a.post(c_ac_path + "includes/json/send/send_typing.php", {
                        userid: u_id,
                        typing: typing,
                        untype: 1
                    }, function() {});
                    fa = -1;
                }, 5000);
                if (fa != typing) {
                    a.post(c_ac_path + "includes/json/send/send_typing.php", {
                        userid: u_id,
                        typing: typing
                    }, function() {});
                    fa = typing;
                }
            }
            if (key.keyCode == 13 && key.shiftKey == 0) {
                var i = $element.val();
                i = i.replace(/^\s+|\s+$/g, "");
                $element.val("").css({
                    height: "18px",
                    'overflow-y': "hidden"
                }).focus();
                if (c_send_priv_msg == 1 && i != "") {
                    displayMessage("chat_chatbox_message_flyout_" + typing, lang[209], "error");
                } else {
                    i != "" && a.ajax({
                        url: c_ac_path + "includes/json/send/send_message.php",
                        type: "post",
                        cache: false,
                        dataType: "json",
                        data: {
                            userid: u_id,
                            to: typing,
                            message: i
                        },
                        beforeSend: function() {
                            a(".chat_textarea").addClass("chat_message_sending");
                        },
                        error: function() {
                            a(".chat_textarea").removeClass("chat_message_sending");
                            displayMessage("chat_chatbox_message_flyout_" + typing, lang[135], "error");
                        },
                        success: function(e) {
                            a(".chat_textarea").removeClass("chat_message_sending");
                            if (e) {
                                if (e == "-1") {
                                    displayMessage("chat_chatbox_message_flyout_" + typing, lang[102], "error");
                                } else {
                                    addMessageToChatbox(typing, i, "1", "1", e, 1, Math.floor((new Date).getTime() / 1000));
                                }
                            }
                            K = 1;
                        }
                    });
                }
                return false;
            }
        }

        function resizeChatfield($element) {
            var height = $element[0].clientHeight;
            if (height < 94) {
                height = Math.max($element[0].scrollHeight, height);
                height = Math.min(94, height);
                if (height > $element[0].clientHeight) {
                    $element.css("height", height + 4 + "px");
                }
            } else {
                $element.css("overflow-y", "auto");
            }
        }

        function chatroomKeyup(b, $element) {
            resizeChatfield($element);
            $chatroom_chat.scrollTop($chatroom_chat[0].scrollHeight);
        }

        function userchatKeyup(key, $element, d) {
            resizeChatfield($element);
            a(".chat_tabcontenttext", $user_popups[d]).scrollTop(a(".chat_tabcontenttext", $user_popups[d])[0].scrollHeight);
        }

        function clearUserStatus() {
            a("#chat_userstab_icon").removeClass("chat_user_available2 chat_user_busy2 chat_user_invisible2 chat_user_away2");
        }

        function setUserStatus(status) {
            a("#chat_userstab_icon").removeClass("chat_user_available2 chat_user_busy2 chat_user_invisible2");
            a.post(c_ac_path + "includes/json/send/send_status.php", {
                userid: u_id,
                status: status
            }, function() {});
        }

        function showUserOffline() {
            w = 1;
            clearUserStatus();
            a("#chat_userstab_icon").addClass("chat_user_invisible2");
            setUserStatus("offline");
            closePopup($userstab_popup, $buddy_list_tab);
            closePopup($optionsbutton_popup, $optionsbutton);
            closePopup($modbutton_popup, $modbutton);
            a("#chat_userstab_text").html(lang[7]);
        }

        function buildMaintenance() {
            $maintenance = a(chat.Templates.maintenance_tab(c_login_url)).appendTo($base);
            $maintenance.mouseover(function() {
                if (c_guests_login_msg == "1" && u_id == "") {
                    showTooltip($maintenance, lang[58]);
                } else {
                    showTooltip($maintenance, lang[27]);
                }
                a(this).addClass("chat_tabmouseover");
            });
            $maintenance.mouseout(function() {
                a(this).removeClass("chat_tabmouseover");
                hideTooltip();
            });
        }

        function buildHideBarButton() {
            $hide_bar_button = a(chat.Templates.bar_hide_tab()).appendTo($base);
            $hide_bar_button.mouseover(function() {
                showTooltip($hide_bar_button, lang[14]);
                a(this).addClass("chat_tabmouseover");
            });
            $hide_bar_button.mouseout(function() {
                a(this).removeClass("chat_tabmouseover");
                hideTooltip();
            });
            $hide_bar_button.click(function() {
                lsClick("#chat_hide_bar_button", "ac_click");
                a.post(c_ac_path + "includes/json/send/send_settings.php", {
                    hide: "1"
                });
                showUserOffline();
                closePopup($chatrooms_popup, $chatrooms_button);
                closePopup($applications_button_popup, $applications_button);
                if (m != "") {
                    closePopup($application_button_popups[m], $application_buttons[m]);
                    m = "";
                }
                if (j != "") {
                    closePopup($user_popups[j], $users[j]);
                    a(".chat_closebox_bottom", $users[j]).removeClass("chat_closebox_bottom_click");
                    j = "";
                }
                clearTimeout(Z);
                clearTimeout(Crref2);
                a.idleTimer("destroy");
                pushCancelAll();
                cancelJSONP();
                $base.hide();
                $show_bar_button.show();
            });
        }

        function buildShowBarButton() {
            $show_bar_button = a(chat.Templates.bar_show_tab()).appendTo($body);
            $show_bar_button.mouseover(function() {
                showTooltip($show_bar_button, lang[15]);
                a(this).addClass("chat_tabmouseover");
            });
            $show_bar_button.mouseout(function() {
                a(this).removeClass("chat_tabmouseover");
                hideTooltip();
            });
            $show_bar_button.click(function() {
                showBar();
            });
        }

        function showBar() {
            lsClick("#chat_show_bar_button", "ac_click");
            a.post(c_ac_path + "includes/json/send/send_settings.php", {
                hide: "-1"
            });
            setUserStatus("available");
            a("#chat_userstab_icon").addClass("chat_user_available2");
            w = 0;
            loadBuddyList();
            pushSubscribe();
            receiveCore();
            a.idleTimer(60000 * chat.IdleTime);
            $show_bar_button.hide();
            $base.show();
        }

        function startCreateChatRoom() {
            var i = a("#chat_chatroom_create_input").val();
            var passinput = a("#chat_chatroom_create_password_input").val();
            a("#chat_chatroom_create_input").val("");
            a("#chat_chatroom_create_password_input").val("");
            i = i.replace(/^\s+|\s+$/g, "");
            i != "" && a.post(c_ac_path + "includes/json/send/send_chatroom_create.php", {
                userid: u_id,
                name: i,
                password: passinput
            }, function(e) {
                if (e) {
                    $chatroom_create_flyout.hide("slide", {
                        direction: "up"
                    }, 250);
                    a("#chat_chatroom_options_flyout").removeClass("chat_chatroom_options_flyout_display");
                    if (e == "-1") {
                        displayMessage("chat_chatroom_message_flyout", lang[39], "error");
                    } else if (e == "-2") {
                        displayMessage("chat_chatroom_message_flyout", lang[40], "error");
                    } else {
                        chatroomreceived = 0;
                        loadChatroomList();
                    }
                }
            });
        }

        function buildChatroomsButton() {
            $chatrooms_button = a(chat.Templates.chatrooms_tab()).appendTo($base);
            $chatrooms_popup = a(chat.Templates.chatrooms_window()).css("display", "none").appendTo($body);
            $chatroom_create = a("#chat_chatroom_create");
            $chatroom_create_flyout = a("#chat_chatroom_create_flyout");
            $chatrooms_button.css("width", c_width_chatroom + "px");
            a("#chat_chatroom_create_input").placeholder();
            a("#chat_chatroom_create_password_input").placeholder();
            if (c_width_chatroom <= 25) {
                a("#chat_chatrooms_text", $chatrooms_button).hide();
            }
            if (u_chatroom_block_chats == 1) {
                a("#chat_chatroom_block :input").prop("checked", true);
            } else {
                a("#chat_chatroom_block").addClass("chat_menu_unchecked");
                a("#chat_chatroom_block :input").prop("checked", false);
            }
            if (u_chatroom_sound == 1) {
                a("#chat_chatroom_sound :input").prop("checked", true);
            } else {
                a("#chat_chatroom_sound").addClass("chat_menu_unchecked");
                a("#chat_chatroom_sound :input").prop("checked", false);
            }
            if (u_chatroom_show_names == 1) {
                a("#chat_chatroom_show_names :input").prop("checked", true);
            } else {
                a("#chat_chatroom_show_names").addClass("chat_menu_unchecked");
                a("#chat_chatroom_show_names :input").prop("checked", false);
            }
            if (u_chatroom_stay != "-1") {
                a("#chat_chatroom_stay :input").prop("checked", true);
            } else {
                a("#chat_chatroom_stay").addClass("chat_menu_unchecked");
                a("#chat_chatroom_stay :input").prop("checked", false);
            }
            if (u_chatroom_open != "-1") {
                a("#chat_chatroom_window :input").prop("checked", true);
            } else {
                a("#chat_chatroom_window").addClass("chat_menu_unchecked");
                a("#chat_chatroom_window :input").prop("checked", false);
            }
            if (c_user_chatrooms == "0") {
                $chatroom_create.hide();
            }
            $chatrooms_button.click(function() {
                lsClick("#chat_chatrooms_button", "ac_openclose");
                count = 0;
                if (c_width_chatroom <= 25) {
                    hideTooltip();
                }
                if (a(".chat_tabalert", $chatrooms_button).length > 0) {
                    a(".chat_tabalert", $chatrooms_button).remove();
                    $chatrooms_button.removeClass("chat_tab_new_message");
                }
                loadChatroomList();
                closePopup($userstab_popup, $buddy_list_tab);
                closePopup($optionsbutton_popup, $optionsbutton);
                closePopup($modbutton_popup, $modbutton);
                $chatrooms_popup.css("left", $chatrooms_button.offset().left - $chatrooms_popup.outerWidth() + $chatrooms_button.outerWidth()).css("bottom", "25px");
                a(this).toggleClass("chat_tabclick").toggleClass("chat_userstabclick");
                $chatrooms_popup.toggleClass("chat_tabopen");
                if ($chatroom_chat !== undefined) {
                    $chatroom_chat.scrollTop(50000);
                }
                a(".chat_chatroom_message_input").focus();
            });
            $chatrooms_button.mouseover(function() {
                if (c_width_chatroom <= 25) {
                    if ($chatrooms_button.hasClass("chat_tabclick")) {} else {
                        showTooltip($chatrooms_button, lang[19]);
                    }
                }
                a(this).addClass("chat_tabmouseover");
            });
            $chatrooms_button.mouseout(function() {
                a(this).removeClass("chat_tabmouseover");
                hideTooltip();
            });
            preventScrolling(a(".chat_chatroom_content"));
            a("#chat_chatroom_password_input").keydown(function(h) {
                if (h.keyCode == 13) {
                    c = a("#chat_chatroom_password_id").val();
                    a("#chat_chatroom_password_flyout").hide();
                    input_value = a("#chat_chatroom_password_input").val();
                    a("#chat_chatroom_password_input").val("");
                    input_value = input_value.replace(/^\s+|\s+$/g, "");
                    a(".chat_chatroom_full_content").html("<div class=\"chat_nofriends\"><div class=\"chat_loading_icon\"></div>" + lang[34] + "</div>");
                    $chatroom_create.hide();
                    Ccr = c;
                    loadChatroom(c, crt[c], input_value);
                }
            });
            a("#chat_password_button").click(function() {
                c = a("#chat_chatroom_password_id").val();
                a("#chat_chatroom_password_flyout").hide();
                input_value = a("#chat_chatroom_password_input").val();
                a("#chat_chatroom_password_input").val("");
                input_value = input_value.replace(/^\s+|\s+$/g, "");
                a(".chat_chatroom_full_content").html("<div class=\"chat_nofriends\"><div class=\"chat_loading_icon\"></div>" + lang[34] + "</div>");
                $chatroom_create.hide();
                Ccr = c;
                loadChatroom(c, crt[c], input_value);
            });
            a("#chat_chatroom_stay").click(function() {
                a(this).toggleClass("chat_menu_unchecked");
                if (a("#chat_chatroom_stay :input").is(":checked")) {
                    a("#chat_chatroom_stay :input").prop("checked", false);
                    _chatroomstay = -1;
                } else {
                    a("#chat_chatroom_stay :input").prop("checked", true);
                    u_chatroom_stay = Ccr;
                    _chatroomstay = Ccr;
                }
                if (a("#chat_chatroom_window :input").is(":checked")) {
                    a("#chat_chatroom_window").toggleClass("chat_menu_unchecked");
                    a("#chat_chatroom_window :input").prop("checked", false);
                }
                a.post(c_ac_path + "includes/json/send/send_settings.php", {
                    chatroom_stay: _chatroomstay
                }, function() {});
            });
            a("#chat_chatroom_window").click(function() {
                a(this).toggleClass("chat_menu_unchecked");
                if (a("#chat_chatroom_window :input").is(":checked")) {
                    a("#chat_chatroom_window :input").prop("checked", false);
                    _chatroomwindow = -1;
                } else {
                    a("#chat_chatroom_window :input").prop("checked", true);
                    u_chatroom_open = Ccr;
                    _chatroomwindow = Ccr;
                }
                if (a("#chat_chatroom_stay :input").is(":checked")) {
                    a("#chat_chatroom_stay").toggleClass("chat_menu_unchecked");
                    a("#chat_chatroom_stay :input").prop("checked", false);
                }
                a.post(c_ac_path + "includes/json/send/send_settings.php", {
                    chatroom_window: _chatroomwindow
                }, function() {});
            });
            a("#chat_chatroom_block").click(function() {
                lsClick("#chat_chatroom_block", "ac_click");
                a(this).toggleClass("chat_menu_unchecked");
                if (a("#chat_chatroom_block :input").is(":checked")) {
                    a("#chat_chatroom_block :input").prop("checked", false);
                    _chatroomblock = -1;
                } else {
                    a("#chat_chatroom_block :input").prop("checked", true);
                    _chatroomblock = 1;
                }
                a.post(c_ac_path + "includes/json/send/send_settings.php", {
                    chatroom_block_chats: _chatroomblock
                }, function() {});
            });
            a("#chat_chatroom_sound").click(function() {
                lsClick("#chat_chatroom_sound", "ac_click");
                a(this).toggleClass("chat_menu_unchecked");
                if (a("#chat_chatroom_sound :input").is(":checked")) {
                    a("#chat_chatroom_sound :input").prop("checked", false);
                    _chatroomsound = -1;
                    u_chatroom_sound = 0;
                } else {
                    a("#chat_chatroom_sound :input").prop("checked", true);
                    _chatroomsound = 1;
                    u_chatroom_sound = 1;
                }
                a.post(c_ac_path + "includes/json/send/send_settings.php", {
                    chatroom_sound: _chatroomsound
                }, function() {});
            });
            a("#chat_chatroom_show_names").click(function() {
                lsClick("#chat_chatroom_show_names", "ac_click");
                a(this).toggleClass("chat_menu_unchecked");
                if (a("#chat_chatroom_show_names :input").is(":checked")) {
                    a("#chat_chatroom_show_names :input").prop("checked", false);
                    _chatroomshownames = -1;
                    u_chatroom_show_names = 0;
                    a(".chat_chatroom_message_name").hide();
                    a(".chat_chatroom_message_avatar").addClass("chat_no_names");
                    $chatroom_chat.scrollTop(50000);
                } else {
                    a("#chat_chatroom_show_names :input").prop("checked", true);
                    _chatroomshownames = 1;
                    u_chatroom_show_names = 1;
                    a(".chat_chatroom_message_name").show();
                    a(".chat_chatroom_message_avatar").removeClass("chat_no_names");
                    $chatroom_chat.scrollTop(50000);
                }
                a.post(c_ac_path + "includes/json/send/send_settings.php", {
                    chatroom_show_names: _chatroomshownames
                }, function() {});
            });
            a(".chat_chatrooms_title", $chatrooms_popup).click(function() {
                $chatrooms_button.click();
            }).children().not(".chat_tab_name").click(function() {
                return false;
            });
            a(".chat_chatrooms_title", $chatrooms_popup).mouseenter(function() {
                a(this).addClass("chat_chatboxtabtitlemouseover3");
            });
            a(".chat_chatrooms_title", $chatrooms_popup).mouseleave(function() {
                a(this).removeClass("chat_chatboxtabtitlemouseover3");
            });
            a("#chat_chatroom_create_input").keydown(function(h) {
                if (h.keyCode == 13) {
                    startCreateChatRoom();
                }
            });
            a("#chat_create_button").click(function() {
                startCreateChatRoom();
            });
            a("#chat_chatroom_leave").click(function() {
                lsClick("#chat_chatroom_leave", "ac_click");
                if (a(".chat_smiley_box", $chatrooms_popup).is(":visible")) {
                    a(".chat_smiley_box", $chatrooms_popup).hide("slide", {
                        direction: "up"
                    }, 250, function() {});
                }
                if (a("#chat_chatroom_options_flyout", $chatrooms_popup).is(":visible")) {
                    a(".chat_chatroom_item2").click();
                }
                if ($chatroom_admin_controls.length) {
                    $chatroom_admin_controls.remove();
                }
                clearTimeout(Crref2);
                a(".chat_chatrooms_title .chat_tab_name").html(lang[19]);
                a(".chat_chatroom_full_content").html("<div class=\"chat_nofriends\"><div class=\"chat_loading_icon\"></div>" + lang[34] + "</div>");
                a("#chat_chatroom_leave").hide();
                a(".chat_chatroom_popout").hide();
                if (c_user_chatrooms == "1") {
                    $chatroom_create.show();
                }
                chatroomreceived = 0;
                loadChatroomList();
                var retain_ccr = Ccr;
                Ccr = 0;
                if (c_push_engine != 1) {
                    cancelJSONP();
                    receiveCore();
                } else {
                    changePushChannel("chatroom" + retain_ccr, 0);
                }
            });
            a(".chat_chatroom_leave").mouseenter(function() {
                showTooltip(a(this), lang[92], 0, 10, 5);
                a(this).addClass("chat_chatroom_leave_hover");
                a("#chat_chatrooms_popup .chat_chatrooms_title").removeClass("chat_chatboxtabtitlemouseover3");
            });
            a(".chat_chatroom_leave").mouseleave(function() {
                a(this).removeClass("chat_chatroom_leave_hover");
                a("#chat_chatrooms_popup .chat_chatrooms_title").addClass("chat_chatboxtabtitlemouseover3");
                hideTooltip();
            });

            function i() {
                a("#chat_chatroom_options_flyout").removeClass("chat_chatroom_options_flyout_display");
            }

            function kal() {
                if ($chatroom_create_flyout.is(":visible")) {
                    $chatroom_create_flyout.hide("slide", {
                        direction: "up"
                    }, 250);
                }
            }
            a(".chat_chatroom_item").click(function() {
                i();
                if (a(".chat_chatroom_item2").hasClass("chat_more_button_selected")) {
                    a(".chat_chatroom_item2").toggleClass("chat_more_button_selected");
                }
                if (!$chatroom_create_flyout.is(":visible")) {
                    $chatroom_create_flyout.show("slide", {
                        direction: "up"
                    }, 250);
                } else {
                    $chatroom_create_flyout.hide("slide", {
                        direction: "up"
                    }, 250);
                }
                if (a("#chat_chatroom_password_flyout").is(":visible")) {
                    a(".chat_chatroom_list").removeClass("chat_chatroom_clicked");
                    a("#chat_chatroom_password_flyout").hide("slide", {
                        direction: "up"
                    }, 250);
                }
            });
            a(".chat_chatroom_item").mouseenter(function() {
                showTooltip(a(this), lang[93], 0, 10, 5);
                a(this).parent().addClass("chat_chatroom_create_hover");
                a("#chat_chatrooms_popup .chat_chatrooms_title").removeClass("chat_chatboxtabtitlemouseover3");
            });
            a(".chat_chatroom_item").mouseleave(function() {
                hideTooltip();
                a(this).parent().removeClass("chat_chatroom_create_hover");
                a("#chat_chatrooms_popup .chat_chatrooms_title").addClass("chat_chatboxtabtitlemouseover3");
            });
            a(".chat_chatroom_item2").click(function() {
                a("#chat_chatroom_options_flyout").children(".chat_inner_menu").show();
                a(".chat_flood_menu").hide();
                hideTooltip();
                kal();
                a("#chat_chatroom_options_flyout").toggleClass("chat_chatroom_options_flyout_display");
                a(this).addClass("chat_more_button_hover");
                a(this).toggleClass("chat_more_button_selected");
            });
            a(".chat_chatroom_item2").mouseenter(function() {
                showTooltip(a(this), lang[23], 0, 10, 5);
                a(this).parent().addClass("chat_more_button_hover");
                a("#chat_chatrooms_popup .chat_chatrooms_title").removeClass("chat_chatboxtabtitlemouseover3");
            });
            a(".chat_chatroom_item2").mouseleave(function() {
                hideTooltip();
                a(this).parent().removeClass("chat_more_button_hover");
                a("#chat_chatrooms_popup .chat_chatrooms_title").addClass("chat_chatboxtabtitlemouseover3");
            });
        }

        function buildPopoutChatButton() {
            $popout_chat_button = a("<div/>").attr("id", "chat_popoutchatbutton").addClass("chat_bar_right").addClass("chat_bar_button").html("<div class=\"chat_inner_button\"><i class=\"chat_icons chat_popin_icon\" /></div>").appendTo($base);
            $popout_chat_button.mouseover(function() {
                showTooltip($popout_chat_button, lang[11]);
                a(this).addClass("chat_tabmouseover");
            });
            $popout_chat_button.mouseout(function() {
                a(this).removeClass("chat_tabmouseover");
                hideTooltip();
            });
            $popout_chat_button.click(function() {
                a(this).hide();
                $buddy_list_tab.show();
                $chatboxes.show();
                $chatbox_right.show();
                $chatbox_left.show();
                if (j != "") {
                    $user_popups[j].show();
                }
                a.post(c_ac_path + "includes/json/send/send_settings.php", {
                    popoutchat: "99"
                }, function() {});
                loadBuddyList();
                receiveCore();
                pushSubscribe();
                a.idleTimer(60000 * chat.IdleTime);
            });
        }

        function buildApplicationButtons() {
            var pold = apps.slice();

            function mysortfn(a, b) {
                if (a[13] < b[13]) {
                    return -1;
                }
                if (a[13] > b[13]) {
                    return 1;
                }
                return 0;
            }
            apps.sort(mysortfn);
            for (b in apps) {
                if (typeof apps[b][0] != "undefined") {
                    if (apps[b][10] == "" || apps[b][10] == 0) {
                        apps[b][10] = 16;
                    }
                    $application_buttons[apps[b][0]] = a("<div/>").attr("id", "chat_applications_button_" + apps[b][0]).addClass("chat_appname_" + apps[b][2]).addClass("chat_bar_left").addClass("chat_apps_button").css("width", apps[b][10] + "px").html(chat.Templates.applications_bookmarks_tab(c_ac_path, apps, b)).appendTo($base);
                    if ((apps[b][12] == "1" || apps[b][9] != "1" && u_id == "" || u_id != "" && apps[b][9] != "1" && u_is_guest == "1") && c_no_apps_menu != 1) {
                        $application_buttons[apps[b][0]].hide();
                    }
                    if (apps[b][6] == "") {
                        $application_button_popups[apps[b][0]] = a("<div/>").attr("id", "chat_applications_button_" + apps[b][0] + "_popup").addClass("chat_apppopup").css("display", "none").html(chat.Templates.applications_bookmarks_window(c_ac_path, apps, b)).appendTo($body);
                    }
                }
            }
            apps = pold.slice();
            a(".chat_app_keep_open").addClass("chat_menu_unchecked");
            a(".chat_app_keep_open :input").prop("checked", false);
            if (u_apps_open != "" && u_apps_open != "0") {
                a("#chat_app_keep_open_" + u_apps_open + " :input").prop("checked", true);
                a("#chat_app_keep_open_" + u_apps_open).removeClass("chat_menu_unchecked");
            }
            a(".chat_apps_button").mouseover(function() {
                var c = a(this).attr("id").substr(30);
                if ($application_buttons[c].hasClass("chat_trayclick")) {} else {
                    if (apps[c][10] <= 16 || apps[c][10] == "") {
                        showTooltip($application_buttons[c], apps[c][1], true);
                    }
                }
                a(this).addClass("chat_tabmouseover");
            });
            a(".chat_apps_button").mouseout(function() {
                a(this).removeClass("chat_tabmouseover");
                hideTooltip();
            });
            a(".chat_traytitle").click(function() {
                var e = a(this).parent().attr("id");
                e = e.substring(30, e.length - 6);
                if ($application_buttons[e]) {
                    $application_buttons[e].click();
                }
            }).children().not(".chat_tab_name").click(function() {
                return false;
            });
            a(".chat_traytitle").each(function(i, element) {
                a(element).mouseenter(function() {
                    a(this).addClass("chat_chatboxtabtitlemouseover");
                });
                a(element).mouseleave(function() {
                    a(this).removeClass("chat_chatboxtabtitlemouseover");
                });
            });
            a(".chat_traytitle .chat_more_button").each(function(i, element) {
                a(element).mouseenter(function() {
                    showTooltip(a(this), lang[23], 0, 10, 5);
                    a(this).addClass("chat_more_button_hover");
                    a(".chat_traytitle").removeClass("chat_chatboxtabtitlemouseover");
                });
                a(element).mouseleave(function() {
                    hideTooltip();
                    a(this).removeClass("chat_more_button_hover");
                    a(".chat_traytitle").addClass("chat_chatboxtabtitlemouseover");
                });
            });
            a(".chat_traytitle .chat_more_anchor").click(function() {
                hideTooltip();
                var c = a(this).attr("id").substr(20);
                a("#chat_apps_more_popout_" + c).toggle();
                a(this).addClass("chat_more_button_hover");
                a(this).toggleClass("chat_more_button_selected");
            });
            addHover(a(".chat_menu_item"), "chat_more_hover");
            a(".chat_app_keep_open").click(function() {
                var c = a(this).attr("id").substr(24);
                a(".chat_app_keep_open").addClass("chat_menu_unchecked");
                if (a("#chat_app_keep_open_" + c + " :input").is(":checked")) {
                    a("#chat_app_keep_open_" + c + " :input").prop("checked", false);
                    var keep_open_id = -1;
                    u_apps_open = "";
                } else {
                    a(".chat_app_keep_open :input").prop("checked", false);
                    a("#chat_app_keep_open_" + c + " :input").prop("checked", true);
                    var keep_open_id = c;
                    u_apps_open = c;
                    a(this).removeClass("chat_menu_unchecked");
                }
                a.post(c_ac_path + "includes/json/send/send_settings.php", {
                    app_keep: keep_open_id
                }, function() {});
            });
            a(".chat_apps_button").click(function() {
                var c = a(this).attr("id").substr(30);
                closePopup($applications_button_popup, $applications_button);
                a(this).children(".chat_tabalert").remove();
                if (apps[c][6] == "") {
                    if (m != c && m !== "") {
                        if (apps[m][7] == 1) {
                            closePopup($application_button_popups[m], $application_buttons[m], 1);
                        } else {
                            closePopup($application_button_popups[m], $application_buttons[m]);
                        }
                        m = "";
                    }
                    if (m == "") {
                        $application_button_popups[c].css("left", $application_buttons[c].offset().left).css("bottom", "25px").css("width", apps[c][4]);
                        $application_button_popups[c].removeClass("chat_tabopen_hidden");
                        $application_button_popups[c].addClass("chat_tabopen");
                        $application_buttons[c].addClass("chat_trayclick");
                        if (apps[c][7] != "1" || apps[c][14] != "1") {
                            a.get(c_ac_path + "applications/" + apps[c][2] + "/index.php", function(d) {
                                a("#chat_applications_button_" + apps[c][0] + "_content").html(d);
                            });
                        }
                        apps[c][14] = 1;
                        m = c;
                    } else {
                        if (apps[m][7] == 1) {
                            closePopup($application_button_popups[m], $application_buttons[m], 1);
                        } else {
                            closePopup($application_button_popups[m], $application_buttons[m]);
                        }
                        var test = a("#chatapplist_" + m).parent().attr("id");
                        if (test == "chat_other_applications") {
                            $application_buttons[m].hide();
                        }
                        m = "";
                    }
                } else {
                    window.open(apps[c][6], "self");
                }
            });
        }

        function buildApplicationsButton() {
            $applications_button = a("<div/>").attr("id", "chat_applications_button").addClass("chat_bar_left").addClass("chat_bar_button").html(chat.Templates.applications_tab()).appendTo($base);
            $applications_button_popup = a("<div/>").attr("id", "chat_applications_button_popup").addClass("chat_tabpopup").css("display", "none").html(chat.Templates.applications_window()).appendTo($body);
            $applications_button.css("width", c_width_apps + "px");
            if (c_width_apps <= 25) {
                a(".chat_tray_name", $applications_button).hide();
            }
            var pold = apps.slice();

            function mysortfn(a, b) {
                if (a[13] < b[13]) {
                    return -1;
                }
                if (a[13] > b[13]) {
                    return 1;
                }
                return 0;
            }
            apps.sort(mysortfn);
            _appslist = "<div style=\"border-bottom: 1px solid #e9e9e9; color: #808080; margin: 3px 2px 4px;\">" + lang[20] + "</div><ul id=\"chat_applications\" class=\"chat_connectedSortable\" style=\"list-style-type: none; margin: 0px; padding: 0px;min-height:20px;\">";
            for (b in apps) {
                if (typeof apps[b][0] != "undefined") {
                    if (apps[b][12] != "1") {
                        if (apps[b][9] == "1" && u_id == "" || u_id != "" && u_is_guest == "1" && apps[b][9] == "1" || u_id != "" && u_is_guest != "1") {
                            _appslist += chat.Templates.applications_bookmarks_list(c_ac_path, apps, b);
                        }
                    }
                }
            }
            _appslist += "</ul><div style=\"border-bottom: 1px solid #e9e9e9; color: #808080; margin: 8px 2px 4px;\">" + lang[64] + "</div><ul id=\"chat_other_applications\" class=\"chat_connectedSortable\" style=\"list-style-type: none; margin: 0px; padding: 0px;min-height:20px;\">";
            for (b in apps) {
                if (typeof apps[b][0] != "undefined") {
                    if (apps[b][12] == "1") {
                        if (apps[b][9] == "1" && u_id == "" || u_id != "" && u_is_guest == "1" && apps[b][9] == "1" || u_id != "" && u_is_guest != "1") {
                            _appslist += chat.Templates.applications_bookmarks_list(c_ac_path, apps, b);
                        }
                    }
                }
            }
            _appslist += "</ul>";
            apps = pold.slice();
            a("#chat_bookmarks").append("<div>" + _appslist + "</div>");
            if (u_id != "") {
                a("#chat_applications, #chat_other_applications").sortable({
                    delay: 50,
                    connectWith: ".chat_connectedSortable",
                    scroll: false,
                    axis: "y",
                    containment: ".chat_traycontent",
                    update: function() {
                        var result = a("#chat_other_applications").sortable("toArray");
                        var result2 = a(this).sortable("serialize") + "&" + a(this).attr("id") + "=1";
                        a.post(c_ac_path + "includes/json/send/send_settings.php", result2, function() {});
                        for (var b = 0; b < result.length; b++) {
                            var c = result[b].substr(17);
                            $application_buttons[c].hide();
                            apps[c][12] = "1";
                        }
                        var result2 = a("#chat_applications").sortable("toArray");
                        for (var b = 0; b < result2.length; b++) {
                            var d = result2[b].substr(17);
                            $application_buttons[d].show();
                            apps[d][12] = "";
                        }
                    }
                });
            } else {
                a(".chat_apps_subtitle").hide();
            }
            a(".chat_app_link:not(.ui-sortable-helper)").on("click", function() {
                var c = a(this).attr("id").substr(14);
                if (apps[c][6] == "") {
                    $application_buttons[c].show();
                    closePopup($applications_button_popup, $applications_button);
                }
                $application_buttons[c].click();
            });
            a(".chat_traytitle", $applications_button_popup).mouseenter(function() {
                a(this).addClass("chat_chatboxtabtitlemouseover");
            });
            a(".chat_traytitle", $applications_button_popup).mouseleave(function() {
                a(this).removeClass("chat_chatboxtabtitlemouseover");
            });
            $applications_button.mouseover(function() {
                if (c_width_apps <= 25) {
                    if ($applications_button.hasClass("chat_tabclick")) {} else {
                        showTooltip($applications_button, lang[16], true);
                    }
                }
                a(this).addClass("chat_tabmouseover");
            });
            $applications_button.mouseout(function() {
                a(this).removeClass("chat_tabmouseover");
                if (c_width_apps <= 25) {
                    hideTooltip();
                }
            });
            a(".chat_traytitle", $applications_button_popup).click(function() {
                $applications_button.click();
            });
            $applications_button.click(function() {
                lsClick("#chat_applications_button", "ac_openclose");
                if (c_width_apps <= 25) {
                    hideTooltip();
                }
                if (m != "") {
                    $application_buttons[m].click();
                    m = "";
                }
                $applications_button_popup.css("left", $applications_button.offset().left).css("bottom", "25px");
                a(this).toggleClass("chat_tabclick");
                $applications_button_popup.toggleClass("chat_tabopen");
            });
        }

        function buildModButton() {
            $modbutton = a("<div/>").attr("id", "chat_modbutton").addClass("chat_bar_right").addClass("chat_bar_button").html(chat.Templates.mod_tab()).appendTo($base);
            $modbutton_popup = a("<div/>").attr("id", "chat_modbutton_popup").addClass("chat_tabpopup").css("display", "none").html(chat.Templates.mod_window()).appendTo($body);
            $modbutton.mouseover(function() {
                $modbutton_popup.hasClass("chat_tabopen") || ($ == 0 ? showTooltip($modbutton, lang[166]) : showTooltip($modbutton, lang[166]));
                a(this).addClass("chat_tabmouseover");
            });
            $modbutton.mouseout(function() {
                a(this).removeClass("chat_tabmouseover");
                hideTooltip();
            });
            $modbutton.click(function() {
                lsClick("#chat_modbutton", "ac_openclose");
                if (a("#chat_modbutton .chat_tabalertnf").length) {
                    a("#chat_modbutton .chat_tabalertnf").remove();
                }
                closePopup($chatrooms_popup, $chatrooms_button);
                closePopup($userstab_popup, $buddy_list_tab);
                closePopup($optionsbutton_popup, $optionsbutton);
                hideTooltip();
                $modbutton_popup.css("left", $modbutton.offset().left - $modbutton_popup.outerWidth() + $modbutton.outerWidth()).css("bottom", "25px");
                a(this).toggleClass("chat_tabclick");
                $modbutton_popup.toggleClass("chat_tabopen");
                $modbutton.toggleClass("chat_modimages_click");
                adjustBarSize();
                if ($modbutton.hasClass("chat_tabclick")) {
                    loadModerationContent();
                }
            });
            a(".chat_moderation_title", $modbutton_popup).click(function() {
                $modbutton.click();
            }).children().not(".chat_tab_name").click(function() {
                return false;
            });
            a(".chat_moderation_title", $modbutton_popup).mouseenter(function() {
                a(this).addClass("chat_chatboxtabtitlemouseover2");
            });
            a(".chat_moderation_title", $modbutton_popup).mouseleave(function() {
                a(this).removeClass("chat_chatboxtabtitlemouseover2");
            });
            if (u_num_mod_reports > 0) {
                a("<div/>").css("top", "-11px").css("left", "8px").addClass("chat_tabalertnf").html(u_num_mod_reports).prependTo($modbutton);
            }
        }

        function loadModerationContent() {
            a(".chat_moderation_full_content").html("<div class=\"chat_nofriends\"><div class=\"chat_loading_icon\"></div>" + lang[34] + "</div>");
            a.ajax({
                url: c_ac_path + "includes/json/receive/receive_moderation.php",
                cache: false,
                type: "get",
                dataType: "json",
                success: function(b) {
                    buildModerationContent(b);
                }
            });
        }

        function buildModerationContent(b) {
            a(".chat_moderation_full_content").html("");
            a(".chat_reports_subtitle").html("<div class=\"chat_report_sub_from\">" + lang[177] + "</div><div class=\"chat_report_sub_about\">" + lang[178] + "</div><div class=\"chat_report_sub_time\">" + lang[179] + "</div>");
            var c = {},
                no_reports = true;
            b && a.each(b, function(i, e) {
                if (i == "reports") {
                    a.each(e, function(l, f) {
                        no_reports = false;
                        a("<div/>").attr("id", "chat_report_" + f.id).mouseover(function() {
                            a(this).addClass("chat_report_list_hover");
                        }).mouseout(function() {
                            a(this).removeClass("chat_report_list_hover");
                        }).addClass("chat_report_list").html("<div class=\"chat_report_from_image\"><img src=\"" + f.from_pic + "\" alt=\"\"></div><div class=\"chat_report_from_name\">" + f.from + "</div><div class=\"chat_report_about_image\"><img src=\"" + f.about_pic + "\" alt=\"\"></div><div class=\"chat_report_about_name\">" + f.about + " (" + f.about_num + ")</div><div class=\"chat_report_time\">" + f.time + "</div><div class=\"chat_clearfix\"></div>").appendTo(a(".chat_moderation_full_content"));
                    });
                }
                if (i == "total_reports") {
                    a(".chat_moderation_title .chat_tab_name").html(lang[166] + " (" + e.count + " " + lang[180] + ")");
                }
            });
            if (c_disable_avatars == 1 || a("#chat_setting_names_only :input").is(":checked")) {
                a(".chat_report_from_image").addClass("chat_hide_avatars");
                a(".chat_report_about_image").addClass("chat_hide_avatars");
                a(".chat_report_from_name").css("width", "165px");
            }
            if (no_reports) {
                a("<div/>").attr("id", "chat_report_no_reports").html(lang[189]).appendTo(a(".chat_moderation_full_content"));
            }
            preventScrolling(a(".chat_moderation_content"));
            a(".chat_report_list").click(function(l) {
                reportClicked(a(this));
            });
        }

        function reportClicked(b) {
            c = "";
            if (a(b).attr("id")) {
                c = a(b).attr("id").substr(17);
            }
            if (c == "") {
                c = a(b).parent().attr("id").substr(17);
            }
            a(".chat_moderation_full_content").html("<div class=\"chat_nofriends\"><div class=\"chat_loading_icon\"></div>" + lang[34] + "</div>");
            open_report = c;
            loadReport(c);
        }

        function loadReport(b) {
            a.ajax({
                url: c_ac_path + "includes/json/receive/receive_report.php",
                data: {
                    reportid: b
                },
                type: "post",
                cache: false,
                dataType: "json",
                success: function(o) {
                    if (o) {
                        clearTimeout(Crref2);
                        var no_error = true;
                        o && a.each(o, function(i, e) {
                            if (i == "error") {
                                a.each(e, function(l, f) {
                                    no_error = false;
                                    open_report = 0;
                                    displayMessage("chat_moderation_flyout", f.m, "error");
                                    loadModerationContent();
                                });
                            }
                        });
                        if (no_error) {
                            a(".chat_reports_subtitle").html("<div class=\"chat_report_sub_back\"><a href=\"javascript:void(0);\">" + lang[186] + "</a></div><div class=\"chat_report_sub_close\"><a href=\"javascript:void(0);\">" + lang[185] + "</a></div><div class=\"chat_report_sub_ban\"><a href=\"javascript:void(0);\">" + lang[183] + "</a></div><div class=\"chat_report_sub_warn\"><a href=\"javascript:void(0);\">" + lang[184] + "</a></div>");
                            a(".chat_moderation_full_content").html(chat.Templates.mod_report());
                            a(".chat_report_sub_back a").click(function() {
                                loadModerationContent();
                            });
                            a(".chat_report_sub_close a").click(function() {
                                a(".chat_reports_subtitle").html("");
                                a(".chat_moderation_full_content").html("<div class=\"chat_nofriends\"><div class=\"chat_loading_icon\"></div>" + lang[34] + "</div>");
                                a.post(c_ac_path + "includes/json/send/send_settings.php", {
                                    report_id: b
                                }, function() {
                                    loadModerationContent();
                                });
                            });
                            a(".chat_report_sub_ban a").click(function() {
                                var r = confirm(lang[195]);
                                if (r == true) {
                                    a(".chat_reports_subtitle").html("");
                                    a(".chat_moderation_full_content").html("<div class=\"chat_nofriends\"><div class=\"chat_loading_icon\"></div>" + lang[34] + "</div>");
                                    a.post(c_ac_path + "includes/json/send/send_settings.php", {
                                        report_ban: b
                                    }, function() {
                                        loadModerationContent();
                                    });
                                }
                            });
                            a(".chat_report_sub_warn a").click(function() {
                                var reason = prompt(lang[196]);
                                if (reason != null && reason != "") {
                                    a.post(c_ac_path + "includes/json/send/send_settings.php", {
                                        report_warn: b,
                                        report_warn_reason: reason
                                    }, function(e) {
                                        if (e == 2) {
                                            var r = confirm(lang[197]);
                                            if (r == true) {
                                                a(".chat_reports_subtitle").html("");
                                                a(".chat_moderation_full_content").html("<div class=\"chat_nofriends\"><div class=\"chat_loading_icon\"></div>" + lang[34] + "</div>");
                                                a.post(c_ac_path + "includes/json/send/send_settings.php", {
                                                    report_warn: b,
                                                    report_warn_reason: reason,
                                                    report_warn_confirm: 1
                                                }, function() {
                                                    loadModerationContent();
                                                });
                                            }
                                        } else {
                                            a(".chat_reports_subtitle").html("");
                                            a(".chat_moderation_full_content").html("<div class=\"chat_nofriends\"><div class=\"chat_loading_icon\"></div>" + lang[34] + "</div>");
                                            loadModerationContent();
                                        }
                                    });
                                }
                            });
                            $report_history = a("#chat_report_history");
                            $report_list = a("#chat_report_list");
                            preventScrolling(a("#chat_report_list"));
                            var no_additional_reports = true,
                                report_time = 0;
                            o && a.each(o, function(i, e) {
                                if (i == "reports") {
                                    a.each(e, function(l, f) {
                                        no_additional_reports = false;
                                        a("<div/>").attr("id", "chat_report_list_id_" + f.id).mouseover(function() {
                                            a(this).addClass("chat_report_list_hover");
                                        }).mouseout(function() {
                                            a(this).removeClass("chat_report_list_hover");
                                        }).click(function() {
                                            if (f.id != open_report) {
                                                a("#chat_report_history_content").html("<div class=\"chat_nofriends\"><div class=\"chat_loading_icon\"></div>" + lang[34] + "</div>");
                                                loadReport(f.id);
                                                open_report = f.id;
                                            }
                                        }).addClass("chat_report_other_list").html("<span class=\"chat_report_list_name\">" + lang[187] + f.id + "</span>").appendTo(a("#chat_list_reports"));
                                        if (f.id == open_report) {
                                            a("#chat_report_list_id_" + f.id).addClass("chat_report_clicked");
                                        }
                                    });
                                }
                                if (i == "report_info") {
                                    a.each(e, function(l, f) {
                                        a(".chat_report_info_about").html(lang[190] + "<a href=\"javascript:void(0);\">" + f.about_name + "</a>");
                                        a(".chat_report_info_from").html(lang[191] + "<a href=\"javascript:void(0);\">" + f.from_name + "</a>");
                                        a(".chat_report_info_warnings").html(lang[192] + f.previous_warnings);
                                        a(".chat_report_info_time").html(lang[193] + f.time);
                                        a(".chat_report_info_about a").click(function() {
                                            receiveUser(f.about, uc_name[f.about], uc_status[f.about], uc_avatar[f.about], uc_link[f.about]);
                                        });
                                        a(".chat_report_info_from a").click(function() {
                                            receiveUser(f.from, uc_name[f.from], uc_status[f.from], uc_avatar[f.from], uc_link[f.from]);
                                        });
                                        report_time = f.unix;
                                    });
                                }
                                if (i == "report_history") {
                                    var d = "",
                                        report_here_used = false;
                                    a.each(e, function(l, f) {
                                        if (typeof blockList[f.userid] == "undefined") {
                                            var title = "",
                                                important = "";
                                            if (f.mod == 1) {
                                                title = lang[137];
                                                important = " chat_chatroom_important";
                                            }
                                            if (f.admin == 1) {
                                                title = lang[136];
                                                important = " chat_chatroom_important";
                                            }
                                            l = "", repotee = "";
                                            fromname = f.n;
                                            if (f.reportee == 1) {
                                                repotee = " chat_reportee";
                                            }
                                            var sent_time = new Date(f.t * 1000);
                                            if (f.t >= report_time && !report_here_used) {
                                                d += "<div class=\"chat_chatroom_box_message chat_clearfix chat_report_here\"><div class=\"chat_chatroom_message_content chat_global_chatroom_message\">" + lang[194] + "</div></div>";
                                                report_here_used = true;
                                            }
                                            if (f.global == 1) {
                                                d += "<div class=\"chat_chatroom_box_message chat_clearfix\" id=\"chat_chatroom_message_" + f.id + "\"><div class=\"chat_chatroom_message_content" + l + " chat_global_chatroom_message\">" + formatTimestamp(sent_time) + f.m + "</div></div>";
                                            } else {
                                                d += "<div class=\"chat_chatroom_box_message chat_clearfix" + l + repotee + important + "\" id=\"chat_chatroom_message_" + f.id + "\"><img class=\"chat_chatroom_message_avatar chat_no_names\" src=\"" + f.a + "\" alt=\"" + fromname + title + "\" /><div class=\"chat_chatroom_message_name\">" + fromname + title + ":</div><div class=\"chat_chatroom_message_content\">" + formatTimestamp(sent_time) + "<span class=\"chat_chatroom_msg\">" + f.m + "</span></div></div>";
                                            }
                                        }
                                    });
                                    if (!report_here_used) {
                                        d += "<div class=\"chat_chatroom_box_message chat_clearfix chat_report_here\"><div class=\"chat_chatroom_message_content chat_global_chatroom_message\">" + lang[194] + "</div></div>";
                                    }
                                    a("#chat_report_history_content").html(d);
                                    showChatroomTime();
                                }
                            });
                            if (c_disable_avatars == 1 || a("#chat_setting_names_only :input").is(":checked")) {
                                a(".chat_chatroom_message_avatar").addClass("chat_hide_avatars");
                                a(".chat_chatroom_message_name").show();
                                a(".chat_chatroom_message_avatar").removeClass("chat_no_names");
                            }
                            a("#chat_report_history").scrollTop(a("#chat_report_history").scrollTop() + a(".chat_report_here").position().top - a("#chat_report_history").height() / 2 + a(".chat_report_here").height() / 2);
                            a(".chat_image_message img").one("load", function() {
                                a("#chat_report_history").scrollTop(a("#chat_report_history").scrollTop() + a(".chat_report_here").position().top - a("#chat_report_history").height() / 2 + a(".chat_report_here").height() / 2);
                            }).each(function() {
                                if (this.complete) {
                                    a(this).load();
                                }
                            });
                            preventScrolling(a("#chat_report_history"));
                            if (no_additional_reports) {
                                a("<div/>").attr("id", "chat_report_list_none").addClass("chat_report_other_list").html("<span class=\"chat_report_list_name\">" + lang[188] + "</span>").appendTo(a("#chat_list_reports"));
                            }
                        }
                    }
                }
            });
        }

        function receiveWarning(h) {
            if (h.read == 0 && h.data != "") {
                a("#chat_warnings").remove();
                $body.append(chat.Templates.warnings_display(h));
                if (a("#chat_announcement").length) {
                    var nb = parseInt(a(window).height() - a("#chat_announcement").position().top);
                    a("#chat_warnings").css("bottom", nb + 5 + "px");
                }
                a("#chat_warnings .chat_warnings_close").click(function() {
                    a("#chat_warnings").remove();
                    if (a("#chat_announcement").length) {
                        a("#chat_announcement").css("bottom", "35px");
                    }
                    a.post(c_ac_path + "includes/json/send/send_settings.php", {
                        warning_read: 1
                    }, function() {});
                });
            } else {
                a("#chat_warnings").remove();
            }
        }

        function buildOptionsButton() {
            $optionsbutton = a("<div/>").attr("id", "chat_optionsbutton").addClass("chat_bar_right").addClass("chat_bar_button").html(chat.Templates.notifications_tab()).appendTo($base);
            $optionsbutton_popup = a("<div/>").attr("id", "chat_optionsbutton_popup").addClass("chat_tabpopup").css("display", "none").html(chat.Templates.notifications_window()).appendTo($body);
            $optionsbutton.mouseover(function() {
                $optionsbutton_popup.hasClass("chat_tabopen") || ($ == 0 ? showTooltip($optionsbutton, lang[0]) : showTooltip($optionsbutton, lang[0]));
                a(this).addClass("chat_tabmouseover");
            });
            $optionsbutton.mouseout(function() {
                a(this).removeClass("chat_tabmouseover");
                hideTooltip();
            });
            a(".chat_see_all_link").mouseenter(function() {
                showTooltip(a(this), lang[21], 0, 10, 5);
                a(this).parent().addClass("chat_see_all_button_hover");
                a("#chat_userstab_popup .chat_userstabtitle").removeClass("chat_chatboxtabtitlemouseover2");
            });
            a(".chat_see_all_link").mouseleave(function() {
                hideTooltip();
                a(this).parent().removeClass("chat_see_all_button_hover");
                a("#chat_userstab_popup .chat_userstabtitle").addClass("chat_chatboxtabtitlemouseover2");
            });
            a(".chat_see_all_link").click(function() {
                lsClick(".chat_see_all_link", "ac_click");
                a("#chat_notifications_content").html("<div class=\"chat_loading_icon\"></div>");
                var i = 0;
                a.ajax({
                    url: c_ac_path + "includes/json/receive/receive_notifications.php",
                    type: "get",
                    cache: false,
                    dataType: "json",
                    success: function(b) {
                        if (b && b != null) {
                            a("#chat_notifications_content").html("");
                            a.each(b, function(e, l) {
                                a.each(l, function(f, h) {
                                    a("<div/>").attr("id", "chat_alert_" + h.alert_id).attr("class", "chat_notification_message_div").html(h.markup).appendTo(a("#chat_notifications_content"));
                                    i++;
                                });
                            });
                            if (i == 0) {
                                a("#chat_notifications_content").html(lang[9]);
                            }
                            if (a(window).height() - $optionsbutton_popup.height() < 80) {
                                a("#chat_notifications_content").css("height", a(window).height() - 135);
                            } else {
                                a("#chat_notifications_content").css("height", "auto");
                            }
                            adjustBarSize();
                        }
                    }
                });
            });
            $optionsbutton.click(function() {
                lsClick("#chat_optionsbutton", "ac_openclose");
                if (a("#chat_notification_alert").length > 0) {
                    a("#chat_notification_alert").remove();
                    $optionsbutton.removeClass("chat_tab_new_message");
                }
                closePopup($modbutton_popup, $modbutton);
                closePopup($chatrooms_popup, $chatrooms_button);
                if (Q > 0) {
                    a("#chat_optionsbutton .chat_tabalertnf").remove();
                    a.post(c_ac_path + "includes/json/send/send_notifications.php", {
                        userid: u_id
                    }, function() {});
                    Q = 0;
                }
                if ($ == 0) {
                    hideTooltip();
                    $optionsbutton_popup.css("left", $optionsbutton.offset().left - $optionsbutton_popup.outerWidth() + $optionsbutton.outerWidth()).css("bottom", "25px");
                    a(this).toggleClass("chat_tabclick");
                    $optionsbutton_popup.toggleClass("chat_tabopen");
                    $optionsbutton.toggleClass("chat_optionsimages_click");
                    closePopup($userstab_popup, $buddy_list_tab);
                } else if (lang[16] != "") {
                    location.href = lang[16];
                }
                if (a(window).height() - $optionsbutton_popup.height() < 80) {
                    a("#chat_notifications_content").css("height", a(window).height() - 135);
                } else {
                    a("#chat_notifications_content").css("height", "auto");
                }
                adjustBarSize();
            });
            a(".chat_userstabtitle", $optionsbutton_popup).click(function() {
                $optionsbutton.click();
            }).children().not(".chat_tab_name").click(function() {
                return false;
            });
            a(".chat_userstabtitle", $optionsbutton_popup).mouseenter(function() {
                a(this).addClass("chat_chatboxtabtitlemouseover2");
            });
            a(".chat_userstabtitle", $optionsbutton_popup).mouseleave(function() {
                a(this).removeClass("chat_chatboxtabtitlemouseover2");
            });
        }

        function displayMessage(id, message, type) {
            clearTimeout(message_timeout);
            if (a("#" + id).is(":visible")) {
                a("#" + id).hide("slide", {
                    direction: "up"
                }, 250, function() {
                    a("#" + id + " .chat_message_text").html(message);
                    type == "error" && a(".chat_message_box").css("background-color", "#ffe2e2").css("border-bottom", "1px solid #ffbebe");
                    type == "notice" && a(".chat_message_box").css("background-color", "#fffae2").css("border-bottom", "1px solid #ffecbe");
                    a("#" + id).show("slide", {
                        direction: "up"
                    }, 250);
                });
            } else {
                type == "error" && a(".chat_message_box").css("background-color", "#ffe2e2").css("border-bottom", "1px solid #ffbebe");
                type == "notice" && a(".chat_message_box").css("background-color", "#fffae2").css("border-bottom", "1px solid #ffecbe");
                a("#" + id + " .chat_message_text").html(message);
                a("#" + id).show("slide", {
                    direction: "up"
                }, 250);
            }
            message_timeout = setTimeout(function() {
                a("#" + id).hide("slide", {
                    direction: "up"
                }, 250);
            }, 5000);
        }

        function loadChatroom(b, c, pass) {
            a(".chat_chatroom_content").removeClass("chat_chatroom_lobby");
            lsClick("#chat_chatroom_" + b, "ac_click");
            var global_mod = 0,
                global_admin = 0,
                admin_markup = "";
            chatroom_mod = 0;
            chatroom_admin = 0;
            chatroomreceived = 1;
            a.ajax({
                url: c_ac_path + "includes/json/receive/receive_chatroom_room.php",
                data: {
                    chatroomid: b,
                    chatroom_window: u_chatroom_open,
                    chatroom_stay: u_chatroom_stay,
                    chatroom_pw: pass
                },
                type: "post",
                cache: false,
                dataType: "json",
                success: function(o) {
                    if (o) {
                        clearTimeout(Crref2);
                        var no_error = true;
                        o && a.each(o, function(i, e) {
                            if (i == "error") {
                                a.each(e, function(l, f) {
                                    no_error = false;
                                    Ccr = 0;
                                    chatroomreceived = 0;
                                    loadChatroomList();
                                    displayMessage("chat_chatroom_message_flyout", f.m, "error");
                                });
                            }
                        });
                        if (no_error) {
                            Crref2 = setTimeout(function() {
                                receiveChatroom(b);
                            }, 30000);
                            if (c_push_engine != 1) {
                                cancelJSONP();
                                receiveCore();
                            } else {
                                changePushChannel("chatroom" + b, 1);
                            }
                            if (typeof crt2[b] != "undefined") {
                                a(".chat_chatrooms_title .chat_tab_name").html(lang[19] + "&nbsp;&nbsp;(" + crt2[b] + ")");
                            }
                            a("#chat_chatroom_leave").show();
                            a(".chat_chatroom_full_content").html(chat.Templates.chatrooms_room(c_max_chatroom_msg));
                            $chatroom_chat = a("#chat_chatroom_chat");
                            $chatroom_room_list = a("#chat_chatroom_room_list");
                            if (c_popout_on == 1) {
                                a(".chat_chatroom_popout", $chatrooms_popup).show();
                            }
                            a(".chat_chatroom_popout", $chatrooms_popup).mouseenter(function() {
                                showTooltip(a(this), lang[117], 0, 10, 5);
                                a(this).addClass("chat_chatroom_popout_hover");
                                a(".chat_chatrooms_title", $chatrooms_popup).removeClass("chat_chatboxtabtitlemouseover3");
                            });
                            a(".chat_chatroom_popout", $chatrooms_popup).mouseleave(function() {
                                a(this).removeClass("chat_chatroom_popout_hover");
                                a(".chat_chatrooms_title", $chatrooms_popup).addClass("chat_chatboxtabtitlemouseover3");
                                hideTooltip();
                            });
                            a(".chat_chatroom_popout", $chatrooms_popup).unbind("click");
                            a(".chat_chatroom_popout", $chatrooms_popup).click(function() {
                                a("#chat_chatroom_leave").click();
                                window.open(c_ac_path + "public/chatroom/?id=" + b, "chatroom", "menubar=0,resizable=0,width=700,height=450,top=25,left=25,scrollbars=0,status=0");
                            });
                            a(".chat_chatroom_message_input", $chatrooms_popup).keydown(function(h) {
                                return chatroomKeydown(h, a(this));
                            });
                            a(".chat_chatroom_message_input", $chatrooms_popup).keyup(function(h) {
                                return chatroomKeyup(h, a(this));
                            });
                            var smiley_exist = [];
                            a(".chat_smiley_box", $chatrooms_popup).html("");
                            for (var i = 0; i < Smiley.length; i++) {
                                if (a.inArray(Smiley[i][0], smiley_exist) > -1) {} else {
                                    a(".chat_smiley_box", $chatrooms_popup).append("<div class=\"chat_smiley_wrapper\" data-id=\"" + i + "\"><img class=\"chat_smiley\" src=\"" + c_ac_path + "themes/" + u_theme + "/images/smilies/" + Smiley[i][0] + ".png\" alt=\"\" /></div>");
                                    smiley_exist.push(Smiley[i][0]);
                                }
                            }
                            a(".chat_smiley_button", $chatrooms_popup).mouseenter(function() {
                                a(this).addClass("chat_smiley_button_hover");
                            });
                            a(".chat_smiley_button", $chatrooms_popup).mouseleave(function() {
                                a(this).removeClass("chat_smiley_button_hover");
                            });
                            a(".chat_smiley_wrapper", $chatrooms_popup).click(function() {
                                var smiley_code = a(this).attr("data-id");
                                var existing_text = a(".chat_chatroom_message_input", $chatrooms_popup).val();
                                a(".chat_chatroom_message_input", $chatrooms_popup).focus().val("").val(existing_text + Smiley[smiley_code][1]);
                            });
                            a(".chat_smiley_button", $chatrooms_popup).click(function() {
                                if (a(".chat_smiley_popout", $chatrooms_popup).is(":visible")) {
                                    a(".chat_smiley_popout", $chatrooms_popup).children(".chat_more_popout").hide();
                                } else {
                                    a(".chat_smiley_popout", $chatrooms_popup).children(".chat_more_popout").show();
                                }
                            });
                            chatroomUploadProcessing();
                            if (c_chatroom_transfer != 1) {
                                a("#chat_upload_button", $chatrooms_popup).hide();
                            }
                            preventScrolling(a(".chat_smiley_box"));
                            preventScrolling(a("#chat_chatroom_chat"));
                            preventScrolling(a("#chat_chatroom_room_list"));
                            if (c_disable_smilies == 1) {
                                a(".chat_smiley_button").hide();
                                a(".chat_chatroom_message_input").css("width", "99%");
                            }
                            o && a.each(o, function(i, e) {
                                if (i == "user_title") {
                                    a.each(e, function(l, f) {
                                        if (f.admin == 1) {
                                            global_admin = 1;
                                            chatroom_admin = 1;
                                        }
                                        if (f.mod == 1) {
                                            global_mod = 1;
                                            chatroom_mod = 1;
                                        }
                                    });
                                }
                                if (i == "chat_name") {
                                    a.each(e, function(l, f) {
                                        if (typeof crt2[b] == "undefined") {
                                            crt2[b] = f.n;
                                            a(".chat_chatrooms_title .chat_tab_name").html(lang[19] + "&nbsp;&nbsp;(" + crt2[b] + ")");
                                        }
                                    });
                                }
                                if (i == "chat_users") {
                                    var longname, adminCount = 0,
                                        modCount = 0,
                                        userCount = 0;
                                    a.each(e, function(l, f) {
                                        if ((global_admin == 1 || global_mod == 1) && (f.t == 1 || f.t == 4)) {
                                            admin_markup = "<hr class=\"chat_options_divider\" /><div class=\"chat_chatroom_options_padding\"><div id=\"chat_chatroom_make_mod_" + f.id + "\" class=\"chat_chatroom_flyout_text\">" + lang[52] + "</div></div><div class=\"chat_chatroom_options_padding\"><div id=\"chat_chatroom_silence_user_" + f.id + "\" class=\"chat_chatroom_flyout_text\">" + lang[161] + "</div></div><div class=\"chat_chatroom_options_padding\"><div id=\"chat_chatroom_ban_user_" + f.id + "\" class=\"chat_chatroom_flyout_text\">" + lang[53] + "</div></div>";
                                        }
                                        if (global_admin == 1 && f.t == 2) {
                                            admin_markup = "<hr class=\"chat_options_divider\" /><div class=\"chat_chatroom_options_padding\"><div id=\"chat_chatroom_remove_mod_" + f.id + "\" class=\"chat_chatroom_flyout_text\">" + lang[54] + "</div></div>";
                                        }
                                        appendVal = a("#chat_chatroom_list_users");
                                        if (f.t == 2) {
                                            appendVal = a("#chat_chatroom_list_mods");
                                            modCount++;
                                        } else if (f.t == 3) {
                                            appendVal = a("#chat_chatroom_list_admins");
                                            adminCount++;
                                        } else {
                                            userCount++;
                                        }
                                        longname = renderHTMLString(f.n);
                                        f.n = renderHTMLString(f.n).length > 16 ? renderHTMLString(f.n).substr(0, 16) + "..." : f.n;
                                        a("<div/>").attr("id", "chat_chatroom_user_" + f.id).mouseover(function() {
                                            a(this).addClass("chat_chatroom_list_hover");
                                        }).mouseout(function() {
                                            a(this).removeClass("chat_chatroom_list_hover");
                                        }).addClass("chat_chatroom_room_list").addClass("chat_chatroom_admin_" + f.t).html("<img class=\"chat_chatroom_avatar\" src=\"" + f.a + "\"/><span class=\"chat_chatroom_room_name\">" + f.n + "</span><span class=\"chat_userscontentdot chat_" + f.status + "\"></span>").appendTo(appendVal);
                                        var pm_opacity = "";
                                        if (f.b == 1 && global_admin != 1 || f.id == u_id) {
                                            pm_opacity = " chat_no_private_msg";
                                        }
                                        a("<div/>").attr("id", "chat_chatroom_users_flyout_" + f.id).addClass("chat_more_wrapper_chatroom").html("<div class=\"chat_chatroom_users_flyout\"><div class=\"chat_chatroom_flyout_avatar\"><img src=\"" + f.a + "\" alt=\"\" /></div><div class=\"chat_chatroom_flyout_info\"><div class=\"chat_chatroom_title_padding\"><div id=\"chat_chatroom_title_" + f.id + "\" class=\"chat_chatroom_flyout_text\"><a href=\"" + f.l + "\">" + longname + "</a><br/>" + lang[43] + "</div></div><hr class=\"chat_options_divider\"/><div class=\"chat_chatroom_options_padding\"><div id=\"chat_chatroom_private_message_" + f.id + "\" class=\"chat_chatroom_flyout_text" + pm_opacity + "\">" + lang[41] + "</div></div><div class=\"chat_chatroom_options_padding\"><div id=\"chat_chatroom_block_user_" + f.id + "\" class=\"chat_chatroom_flyout_text\">" + lang[84] + "</div></div><div class=\"chat_chatroom_options_padding\"><div id=\"chat_chatroom_report_user_" + f.id + "\" class=\"chat_chatroom_flyout_text\">" + lang[167] + "</div></div>" + admin_markup + "</div><div class=\"chat_clearfix\"></div><i class=\"chat_more_tip_chatroom\"></i></div>").appendTo(a("#chat_chatroom_user_" + f.id));
                                        if (f.t == 2) {
                                            a("#chat_chatroom_title_" + f.id).html("<a href=\"" + f.l + "\">" + longname + "</a><br/>" + lang[44]);
                                        } else if (f.t == 3) {
                                            a("#chat_chatroom_title_" + f.id).html("<a href=\"" + f.l + "\">" + longname + "</a><br/>" + lang[45]);
                                        } else if (f.t == 4) {
                                            a("#chat_chatroom_title_" + f.id).html("<a href=\"" + f.l + "\">" + longname + "</a><br/>" + lang[212]);
                                        }
                                        addHover(a(".chat_chatroom_options_padding"), "chat_options_padding_hover");
                                        chatroomUserOptions(f, global_admin);
                                    });
                                    userCount == 0 && a("#chat_chatroom_line_users").hide();
                                    adminCount == 0 && a("#chat_chatroom_line_admins").hide();
                                    modCount == 0 && a("#chat_chatroom_line_mods").hide();
                                    a(".chat_chatroom_admin_3").css("background-color", "#" + c_admin_bg);
                                    a(".chat_chatroom_admin_3").css("color", "#" + c_admin_txt);
                                }
                                if (i == "chat_history") {
                                    d = "";
                                    a.each(e, function(l, f) {
                                        if (typeof blockList[f.userid] == "undefined") {
                                            var title = "",
                                                important = "";
                                            if (f.mod == 1) {
                                                title = lang[137];
                                                important = " chat_chatroom_important";
                                            }
                                            if (f.admin == 1) {
                                                title = lang[136];
                                                important = " chat_chatroom_important";
                                            }
                                            l = "";
                                            fromname = f.n;
                                            if (f.n == u_name) {
                                                l = " chat_self";
                                            }
                                            var sent_time = new Date(f.t * 1000);
                                            if (f.global == 1) {
                                                d += "<div class=\"chat_chatroom_box_message chat_clearfix\" id=\"chat_chatroom_message_" + f.id + "\"><div class=\"chat_chatroom_message_content" + l + " chat_global_chatroom_message\">" + formatTimestamp(sent_time) + f.m + "</div></div>";
                                            } else {
                                                d += "<div class=\"chat_chatroom_box_message chat_clearfix" + l + important + "\" id=\"chat_chatroom_message_" + f.id + "\"><img class=\"chat_chatroom_message_avatar chat_no_names\" src=\"" + f.a + "\" alt=\"" + fromname + title + "\" /><div class=\"chat_chatroom_message_name\">" + fromname + title + ":</div><div class=\"chat_chatroom_message_content\"><div class=\"chat_chatroom_delete\" data-id=\"" + f.id + "\"> </div>" + formatTimestamp(sent_time) + "<span class=\"chat_chatroom_msg\">" + f.m + "</span></div></div>";
                                            }
                                        }
                                    });
                                    a("#chat_chatroom_chat #chat_chatroom_chat_content").html(d);
                                    showChatroomTime();
                                }
                                if (i == "room_info") {
                                    a.each(e, function(l, f) {
                                        if (f.welcome_msg != "") {
                                            var message = stripslashes(f.welcome_msg);
                                            room_info[b] = message;
                                            message = replaceURLWithHTMLLinks(message);
                                            $chatroom_chat.append("<div class=\"chat_chatroom_box_message chat_clearfix\" id=\"chat_chatroom_welcome_msg\"><div class=\"chat_chatroom_message_content chat_global_chatroom_message\">" + message + "</div></div>");
                                        }
                                        room_desc[b] = f.desc;
                                        room_limit_msg[b] = f.limit_msg;
                                        room_limit_sec[b] = f.limit_sec;
                                    });
                                }
                            });
                            modDeleteControls();
                            if (c_disable_avatars == 1 || a("#chat_setting_names_only :input").is(":checked")) {
                                a(".chat_chatroom_avatar").addClass("chat_hide_avatars");
                                a(".chat_chatroom_message_avatar").addClass("chat_hide_avatars");
                                a(".chat_chatroom_flyout_avatar").addClass("chat_hide_avatars");
                                a(".chat_chatroom_message_name").show();
                                a(".chat_chatroom_message_avatar").removeClass("chat_no_names");
                            }
                            if (a("#chat_chatroom_show_names :input").is(":checked")) {
                                a(".chat_chatroom_message_name").show();
                                a(".chat_chatroom_message_avatar").removeClass("chat_no_names");
                            }
                            $chatroom_chat.scrollTop(50000);
                            a(".chat_chatroom_message_input").focus();
                            if (global_admin == 1 || global_mod == 1) {
                                if (!a(".chat_chatroom_admin_menu").length || !a(".chat_flood_menu").length) {
                                    addChatroomAdminControls();
                                }
                            } else {
                                if ($chatroom_admin_controls.length) {
                                    $chatroom_admin_controls.remove();
                                }
                            }
                            a(".chat_image_message img").one("load", function() {
                                $chatroom_chat.scrollTop(50000);
                            }).each(function() {
                                if (this.complete) {
                                    a(this).load();
                                }
                            });
                        } else {
                            if (c_user_chatrooms == "1") {
                                $chatroom_create.show();
                            }
                        }
                    }
                }
            });
        }

        function modDeleteControls() {
            if (chatroom_mod == 1 || chatroom_admin == 1) {
                a(".chat_chatroom_delete").show();
                a(".chat_chatroom_delete", $chatrooms_popup).unbind("mouseenter").unbind("mouseleave").unbind("click");
                a(".chat_chatroom_delete", $chatrooms_popup).mouseenter(function() {
                    showTooltip(a(this), lang[160], 0, 3, 21);
                    a(this).addClass("chat_chatroom_delete_hover");
                });
                a(".chat_chatroom_delete", $chatrooms_popup).mouseleave(function() {
                    hideTooltip();
                    a(this).removeClass("chat_chatroom_delete_hover");
                });
                a(".chat_chatroom_delete").click(function() {
                    hideTooltip();
                    var msg_id = a(this).attr("data-id");
                    a("#chat_chatroom_message_" + msg_id + " .chat_chatroom_delete").remove();
                    a.post(c_ac_path + "includes/json/send/send_settings.php", {
                        delete_msg: msg_id,
                        chatroom_id: Ccr,
                        delete_name: u_name
                    }, function() {
                        a("#chat_chatroom_message_" + msg_id + " .chat_chatroom_msg").html(lang[159] + u_name);
                    });
                });
            } else {
                a(".chat_chatroom_delete").hide();
            }
        }

        function chatroomUploadProcessing() {
            var ts67 = Math.round((new Date).getTime());
            var path = c_ac_path.replace("../", "/");
            a("#chat_upload_button").uploadify({
                swf: path + "includes/js/uploadify/uploadify.swf",
                uploader: path + "includes/classes/class_uploads.php",
                hideButton: true,
                buttonText: " ",
                wmode: "transparent",
                formData: {
                    unixtime: ts67,
                    user: u_id
                },
                height: 25,
                width: 24,
                multi: false,
                auto: true,
                fileTypeExts: "*.jpg;*.gif;*.png;*.zip;*.rar;*.jpeg;*.txt;*.doc;*.mp3;*.wmv;*.avi;*.mp4;*.docx;*.wav",
                fileTypeDesc: "Supported File Types (.JPG, .JPEG, .GIF, .PNG, .WMV, .AVI, .MP4, .ZIP, .RAR, .MP3, .WAV, .TXT, .DOC, .DOCX)",
                fileSizeLimit: c_max_upload_size + "MB",
                onSelect: function() {},
                onCancel: function() {},
                onUploadComplete: function() {
                    chatroomUploadProcessing();
                },
                onUploadError: function(file, errorCode, errorMsg, errorString) {
                    displayMessage("chat_chatroom_message_flyout", lang[151], "error");
                },
                onUploadSuccess: function(file) {
                    var uploadType = "file",
                        fileType = file.type.toLowerCase();
                    if (fileType == ".png" || fileType == ".gif" || fileType == ".jpg" || fileType == ".jpeg") {
                        uploadType = "image";
                    }
                    a.post(c_ac_path + "includes/json/send/send_message_chatroom.php", {
                        userid: u_id,
                        username: u_name,
                        chatroomid: Ccr,
                        message: uploadType + "{" + ts67 + "}{" + file.name + "}"
                    }, function(e) {
                        if (e == "-1") {
                            displayMessage("chat_chatroom_message_flyout", lang[102], "error");
                        } else {
                            displayMessage("chat_chatroom_message_flyout", lang[68], "notice");
                        }
                        $chatroom_chat.scrollTop(50000);
                    });
                }
            });
            a("#chat_upload_button", $chatrooms_popup).mouseenter(function() {
                a(this).addClass("chat_upload_button_hover");
            });
            a("#chat_upload_button", $chatrooms_popup).mouseleave(function() {
                a(this).removeClass("chat_upload_button_hover");
            });
        }

        function addChatroomAdminControls() {
            $chatroom_admin_controls = a("<div/>").addClass("chat_chatroom_admin_menu").html("<li class=\"chat_menu_separator\"></li><li class=\"chat_menu_item\"><a id=\"chat_edit_description\" class=\"chat_menu_anchor chat_menu_no_check\"><span>" + lang[157] + "</span></a></li><li class=\"chat_menu_item\"><a id=\"chat_edit_welcome\" class=\"chat_menu_anchor chat_menu_no_check\"><span>" + lang[153] + "</span></a></li><li class=\"chat_menu_item\"><a id=\"chat_edit_flood\" class=\"chat_menu_anchor chat_menu_no_check\"><span>" + lang[171] + "</span></a></li>").appendTo("#chat_chatroom_options_flyout .chat_inner_menu");
            addHover(a(".chat_menu_item"), "chat_more_hover");
            a("#chat_edit_welcome").click(function() {
                var welcome_msg_input = prompt(lang[154], room_info[Ccr]);
                if (welcome_msg_input || welcome_msg_input == "") {
                    a.post(c_ac_path + "includes/json/send/send_settings.php", {
                        chatroom_welcome_msg: welcome_msg_input,
                        chatroom_id: Ccr
                    }, function() {
                        displayMessage("chat_chatroom_message_flyout", lang[155], "notice");
                        room_info[Ccr] = welcome_msg_input;
                        a(".chat_chatroom_item2").click();
                    });
                }
            });
            a("#chat_edit_description").click(function() {
                var desc_input = prompt(lang[158], room_desc[Ccr]);
                if (desc_input || desc_input == "") {
                    a.post(c_ac_path + "includes/json/send/send_settings.php", {
                        chatroom_description: desc_input,
                        chatroom_id: Ccr
                    }, function() {
                        displayMessage("chat_chatroom_message_flyout", lang[155], "notice");
                        room_desc[Ccr] = desc_input;
                        a(".chat_chatroom_item2").click();
                    });
                }
            });
            a("#chat_edit_flood").unbind("click");
            a("#chat_edit_flood").click(function() {
                a(this).parent().parent().parent(".chat_inner_menu").hide();
                a("#chat_flood_select_messages").val(room_limit_msg[Ccr]);
                a("#chat_flood_select_seconds").val(room_limit_sec[Ccr]);
                a(".chat_flood_menu").show();
            });
            a("#chat_flood_button").unbind("click");
            a("#chat_flood_button").click(function() {
                a(".chat_chatroom_item2").click();
                var flood_message = a("#chat_flood_select_messages").val();
                var flood_seconds = a("#chat_flood_select_seconds").val();
                if (!isNaN(flood_message) && !isNaN(flood_seconds)) {
                    a.post(c_ac_path + "includes/json/send/send_settings.php", {
                        chatroom_id: Ccr,
                        flood_message: flood_message,
                        flood_seconds: flood_seconds
                    }, function() {
                        displayMessage("chat_chatroom_message_flyout", lang[155], "notice");
                        room_limit_msg[Ccr] = flood_message;
                        room_limit_sec[Ccr] = flood_seconds;
                    });
                }
            });
        }

        function receiveUser(b, c, d, e, l, f, h) {
            if (!(b == null || b == "")) {
                if ((uc_name[b] == null || uc_name[b] == "") && b.toString().search("facebook") == "-1") {
                    if (aa[b] != 1) {
                        aa[b] = 1;
                        a.ajax({
                            url: c_ac_path + "includes/json/receive/receive_user.php",
                            data: {
                                userid: b
                            },
                            type: "post",
                            cache: false,
                            dataType: "json",
                            success: function(o) {
                                if (o) {
                                    c = uc_name[b] = o.n;
                                    d = uc_status[b] = o.s;
                                    e = uc_avatar[b] = o.a;
                                    l = uc_link[b] = o.l;
                                    if (G[b] != null) {
                                        a(".chat_closebox_bottom_status", $user[b]).removeClass("chat_available chat_busy chat_offline").addClass("chat_" + d);
                                        $users[b].removeClass("chat_tab_offline").addClass("chat_tab_" + c);
                                        $user_popups[b].length > 0 && a(".chat_tabsubtitle .chat_message", $user_popups[b]).html(i);
                                    }
                                    aa[b] = 0;
                                    if (c != null) {
                                        toggleUserChatTab(b, c, d, e, l, f);
                                    } else {
                                        a.post(c_ac_path + "includes/json/send/send_settings.php", {
                                            unfocus_chat: b
                                        }, function() {});
                                    }
                                }
                            }
                        });
                    } else {
                        setTimeout(function() {
                            receiveUser(b, uc_name[b], uc_status[b], uc_avatar[b], uc_link[b], f, h);
                        }, 500);
                    }
                } else {
                    if (b.toString().search("facebook") == "-1") {
                        toggleUserChatTab(b, uc_name[b], uc_status[b], uc_avatar[b], uc_link[b], f);
                    } else {
                        toggleUserChatTab(b, uc_name[b], uc_status[b], uc_avatar[b], uc_link[b], f, 1);
                    }
                }
            }
        }

        function toggleUserChatTab(b, c, d, e, l, f, jabber) {
            if (G[b] != null) {
                if (!$users[b].hasClass("chat_tabclick") && f != 1) {
                    if (j != "") {
                        closePopup($user_popups[j], $users[j]);
                        j = "";
                    }
                    if ($users[b].offset().left < $chatboxes.offset().left + $chatboxes.width() && $users[b].offset().left - $chatboxes.offset().left >= 0) {
                        $users[b].click();
                    } else {
                        a(".chat_tabalert").css("display", "none");
                        e = 800;
                        if (get("initialize") == 1) {
                            e = 0;
                        }
                        $chatboxes.scrollTo($users[b], e, function() {
                            $users[b].click();
                            updateRightLastClasses();
                            positionTabAlerts();
                        });
                    }
                }
                updateRightLastClasses();
            } else {
                $chatboxes_wide.width($chatboxes_wide.width() + 148);
                adjustBarSize();
                shortname = renderHTMLString(c).length > 12 ? renderHTMLString(c).substr(0, 12) + "..." : c;
                longname = renderHTMLString(c).length > 17 ? renderHTMLString(c).substr(0, 17) + "..." : c;
                $users[b] = a(chat.Templates.chat_tab(shortname)).attr("data-id", b).appendTo($chatboxes_wide);
                $users[b].children(".chat_inner_button").prepend("<div class=\"chat_closebox_bottom_status chat_" + d + "\"></div>");
                $users[b].addClass("chat_tab_" + d);
                $users[b].append("<div class=\"chat_closebox_bottom\"></div>");
                a(".chat_closebox_bottom", $users[b]).mouseenter(function() {
                    a(this).addClass("chat_closebox_bottomhover");
                });
                a(".chat_closebox_bottom", $users[b]).mouseleave(function() {
                    a(this).removeClass("chat_closebox_bottomhover");
                });
                a(".chat_closebox_bottom", $users[b]).click(function() {
                    lsClick(".chat_closebox_bottom", "ac_click", "users['" + b + "']");
                    a.post(c_ac_path + "includes/json/send/send_settings.php", {
                        close_chat: b,
                        tab_alert: 1
                    }, function() {});
                    $user_popups[b].remove();
                    $users[b].remove();
                    if (j == b) {
                        j = "";
                    }
                    $chatboxes_wide.width($chatboxes_wide.width() - 148);
                    $chatboxes.scrollTo("-=148px");
                    adjustBarSize();
                    y[b] = null;
                    G[b] = null;
                    ca[b] = 0;
                });
                i = c = "";
                if (l != "") {
                    c = "<a href=\"" + l + "\">";
                    i = "</a>";
                }
                l = "";
                if (e != "") {
                    l = "<div class=\"chat_avatarbox\">" + c + "<img src=\"" + e + "\" class=\"chat_avatar\" />" + i + "</div>";
                }
                $user_popups[b] = a(chat.Templates.chat_window(c, longname, i, l, b)).css("display", "none").appendTo($body);
                if (c_video_chat != 1) {
                    a("#chat_video_chat_" + b).hide();
                }
                if (c_file_transfer != 1) {
                    a("#chat_file_transfer_" + b).hide();
                }
                if (c_enable_moderation != 1) {
                    a("#chat_report_" + b).hide();
                }
                if (c_popout_on != 1) {
                    a(".chat_chat_popout").hide();
                }
                addHover(a(".chat_video_chat"), "chat_more_hover");
                a("#chat_file_cancel_" + b).click(function() {
                    a("#chat_file_upload_div_" + b).hide("slide", {
                        direction: "up"
                    }, 250);
                });
                a("#chat_file_transfer_" + b).click(function() {
                    var ts67 = Math.round((new Date).getTime());
                    var path = c_ac_path.replace("../", "/");
                    a("#chat_file_upload_" + b).uploadify({
                        swf: path + "includes/js/uploadify/uploadify.swf",
                        uploader: path + "includes/classes/class_uploads.php",
                        hideButton: true,
                        buttonText: " ",
                        wmode: "transparent",
                        formData: {
                            unixtime: ts67,
                            user: u_id
                        },
                        height: 17,
                        width: 42,
                        multi: false,
                        auto: true,
                        fileTypeExts: "*.jpg;*.gif;*.png;*.zip;*.rar;*.jpeg;*.txt;*.doc;*.mp3;*.wmv;*.avi;*.mp4;*.docx;*.wav",
                        fileTypeDesc: "Supported File Types (.JPG, .JPEG, .GIF, .PNG, .WMV, .AVI, .MP4, .ZIP, .RAR, .MP3, .WAV, .TXT, .DOC, .DOCX)",
                        fileSizeLimit: c_max_upload_size + "MB",
                        onSelect: function() {
                            a(".chat_upload_info_text").hide();
                            a(".chat_upload_text").hide();
                            a(".chat_ui_button").css("background", "none");
                            a(".chat_ui_button").css("border", "none");
                        },
                        onCancel: function() {
                            a("#chat_file_upload_div_" + b).hide("slide", {
                                direction: "up"
                            }, 250);
                            a(".chat_upload_info_text").show();
                            a(".chat_upload_text").show();
                            a(".chat_ui_button").css("background", "#5B74A8");
                            a(".chat_ui_button").css("border", "1px solid #999");
                        },
                        onUploadError: function(file, errorCode, errorMsg, errorString) {
                            a("#chat_file_upload_div_" + b).hide();
                            a(".chat_upload_info_text").show();
                            a(".chat_upload_text").show();
                            a(".chat_ui_button").css("background", "#5B74A8");
                            a(".chat_ui_button").css("border", "1px solid #999");
                            displayMessage("chat_chatbox_message_flyout_" + b, lang[151], "error");
                        },
                        onUploadComplete: function(file) {
                            var uploadType = "file",
                                fileType = file.type.toLowerCase();
                            if (fileType == ".png" || fileType == ".gif" || fileType == ".jpg" || fileType == ".jpeg") {
                                uploadType = "image";
                            }
                            a.post(c_ac_path + "includes/json/send/send_message.php", {
                                userid: u_id,
                                to: b,
                                message: uploadType + "{" + ts67 + "}{" + file.name + "}"
                            }, function(e) {
                                if (e == "-1") {
                                    displayMessage("chat_chatbox_message_flyout_" + b, lang[102], "error");
                                } else {
                                    displayMessage("chat_chatbox_message_flyout_" + b, lang[68], "notice");
                                }
                                a(".chat_tabcontenttext", $user_popups[b]).scrollTop(a(".chat_tabcontenttext", $user_popups[b])[0].scrollHeight);
                            });
                            a("#chat_file_upload_div_" + b).hide();
                            a(".chat_upload_info_text").show();
                            a(".chat_upload_text").show();
                            a(".chat_ui_button").css("background", "#5B74A8");
                            a(".chat_ui_button").css("border", "1px solid #999");
                        }
                    });
                    a("#chat_more_popout_" + b).toggle();
                    a("#chat_more_" + b).toggleClass("chat_more_button_selected");
                    a("#chat_file_upload_div_" + b).show("slide", {
                        direction: "up"
                    }, 250);
                });
                if (uc_status[b] == "offline" || uc_status[b] == "busy") {
                    a(".chat_tabtitle .chat_video_icon", $user_popups[b]).addClass("chat_video_unavailable");
                } else {
                    a(".chat_tabtitle .chat_video_icon", $user_popups[b]).removeClass("chat_video_unavailable");
                }
                a("#chat_video_chat_" + b).click(function() {
                    if (uc_status[b] != "offline" && uc_status[b] != "busy") {
                        var RN = Math.floor(Math.random() * 9999999999);
                        while (String(RN).length < 10) {
                            RN = "0" + RN;
                        }
                        jqac.chat.videoWith(RN);
                        a.post(c_ac_path + "includes/json/send/send_message.php", {
                            userid: u_id,
                            to: b,
                            message: "video{" + RN + "}"
                        }, function(e) {
                            if (e == "-1") {
                                displayMessage("chat_chatbox_message_flyout_" + b, lang[102], "error");
                            } else {
                                displayMessage("chat_chatbox_message_flyout_" + b, lang[63], "notice");
                            }
                            a(".chat_tabcontenttext", $user_popups[b]).scrollTop(a(".chat_tabcontenttext", $user_popups[b])[0].scrollHeight);
                        });
                    }
                });
                preventScrolling(a(".chat_tabcontenttext, .chat_smiley_box"));
                var smiley_exist = [];
                for (var i = 0; i < Smiley.length; i++) {
                    if (a.inArray(Smiley[i][0], smiley_exist) > -1) {} else {
                        a(".chat_smiley_box", $user_popups[b]).append("<div class=\"chat_smiley_wrapper\" data-id=\"" + i + "\"><img class=\"chat_smiley\" src=\"" + c_ac_path + "themes/" + u_theme + "/images/smilies/" + Smiley[i][0] + ".png\" alt=\"\" /></div>");
                        smiley_exist.push(Smiley[i][0]);
                    }
                }
                a(".chat_smiley_button", $user_popups[b]).mouseenter(function() {
                    a(this).addClass("chat_smiley_button_hover");
                });
                a(".chat_smiley_button", $user_popups[b]).mouseleave(function() {
                    a(this).removeClass("chat_smiley_button_hover");
                });
                a(".chat_smiley_wrapper", $user_popups[b]).click(function() {
                    var smiley_code = a(this).attr("data-id");
                    var existing_text = a(".chat_textarea", $user_popups[b]).val();
                    a(".chat_textarea", $user_popups[b]).focus().val("").val(existing_text + Smiley[smiley_code][1]);
                });
                a(".chat_smiley_button", $user_popups[b]).click(function() {
                    if (a(".chat_smiley_popout", $user_popups[b]).is(":visible")) {
                        a(".chat_smiley_popout", $user_popups[b]).children(".chat_more_popout").hide();
                    } else {
                        a(".chat_smiley_popout", $user_popups[b]).children(".chat_more_popout").show();
                    }
                });
                if (c_disable_smilies == 1) {
                    a(".chat_smiley_button").hide();
                    a(".chat_textarea").css("width", "99%");
                }
                a(".chat_tabtitle .chat_more_button", $user_popups[b]).mouseenter(function() {
                    showTooltip(a(this), lang[23], 0, 10, 5);
                    a(this).addClass("chat_more_button_hover");
                    a(".chat_tabtitle", $user_popups[b]).removeClass("chat_chatboxtabtitlemouseover");
                });
                a(".chat_tabtitle .chat_more_button", $user_popups[b]).mouseleave(function() {
                    hideTooltip();
                    a(this).removeClass("chat_more_button_hover");
                    a(".chat_tabtitle", $user_popups[b]).addClass("chat_chatboxtabtitlemouseover");
                });
                a("#chat_more_" + b).click(function() {
                    hideTooltip();
                    a("#chat_more_popout_" + b).toggle();
                    a(this).addClass("chat_more_button_hover");
                    a(this).toggleClass("chat_more_button_selected");
                });
                a("#chat_block_" + b).click(function() {
                    a("#chat_more_popout_" + b).toggle();
                    a("#chat_more_" + b).toggleClass("chat_more_button_selected");
                    a(".chat_tabtitle .chat_closebox", $user_popups[b]).click();
                    a.post(c_ac_path + "includes/json/send/send_settings.php", {
                        block_chat: b
                    }, function() {
                        if (typeof blockList[b] == "undefined") {
                            blockList[b] = b;
                        }
                        loadBuddyList();
                    });
                });
                a("#chat_clear_" + b).click(function() {
                    a("#chat_more_popout_" + b).toggle();
                    a("#chat_more_" + b).toggleClass("chat_more_button_selected");
                    a("#chat_tabcontenttext_" + b).html("");
                    a.post(c_ac_path + "includes/json/send/send_settings.php", {
                        clear_chat: b
                    }, function() {});
                });
                a("#chat_report_" + b).click(function() {
                    a("#chat_more_popout_" + b).toggle();
                    a("#chat_more_" + b).toggleClass("chat_more_button_selected");
                    a.post(c_ac_path + "includes/json/send/send_settings.php", {
                        report_from: u_id,
                        report_about: b
                    }, function() {
                        displayMessage("chat_chatbox_message_flyout_" + b, lang[168], "notice");
                    });
                });
                a(".chat_textarea", $user_popups[b]).keydown(function(h) {
                    return userchatKeydown(h, a(this), b, jabber);
                });
                a(".chat_textarea", $user_popups[b]).keyup(function(h) {
                    return userchatKeyup(h, a(this), b);
                });
                a(".chat_tabtitle .chat_closebox", $user_popups[b]).mouseenter(function() {
                    showTooltip(a(this), lang[89], 0, 10, 5);
                    a(this).addClass("chat_chatboxmouseoverclose");
                    a(".chat_tabtitle", $user_popups[b]).removeClass("chat_chatboxtabtitlemouseover");
                });
                a(".chat_tabtitle .chat_closebox", $user_popups[b]).mouseleave(function() {
                    a(this).removeClass("chat_chatboxmouseoverclose");
                    a(".chat_tabtitle", $user_popups[b]).addClass("chat_chatboxtabtitlemouseover");
                    hideTooltip();
                });
                a(".chat_tabtitle .chat_closebox", $user_popups[b]).click(function() {
                    lsClick(".chat_tabtitle .chat_closebox", "ac_click", "user_popups['" + b + "']");
                    hideTooltip();
                    a.post(c_ac_path + "includes/json/send/send_settings.php", {
                        close_chat: b,
                        tab_alert: 1
                    }, function() {});
                    $user_popups[b].remove();
                    $users[b].remove();
                    if (j == b) {
                        j = "";
                    }
                    $chatboxes_wide.width($chatboxes_wide.width() - 148);
                    $chatboxes.scrollTo("-=148px");
                    adjustBarSize();
                    G[b] = null;
                    y[b] = null;
                    ca[b] = 0;
                });
                a(".chat_tabtitle .chat_video_icon", $user_popups[b]).mouseenter(function() {
                    if (uc_status[b] == "offline" || uc_status[b] == "busy") {
                        showTooltip(a(this), lang[146], 0, 10, 5);
                    } else {
                        showTooltip(a(this), lang[88], 0, 10, 5);
                        a(this).addClass("chat_video_icon_hover");
                    }
                    a(".chat_tabtitle", $user_popups[b]).removeClass("chat_chatboxtabtitlemouseover");
                });
                a(".chat_tabtitle .chat_video_icon", $user_popups[b]).mouseleave(function() {
                    a(this).removeClass("chat_video_icon_hover");
                    a(".chat_tabtitle", $user_popups[b]).addClass("chat_chatboxtabtitlemouseover");
                    hideTooltip();
                });
                a(".chat_more_popout .chat_chat_popout", $user_popups[b]).click(function() {
                    a("#chat_more_popout_" + b).toggle();
                    a("#chat_more_" + b).toggleClass("chat_more_button_selected");
                    startPopoutChat();
                });
                a(".chat_more_popout .chat_chat_popout", $user_popups[b]).popupWindow({
                    windowURL: c_ac_path + "public/popout/",
                    height: 450,
                    width: 700,
                    top: 25,
                    left: 25
                });
                a(".chat_tabtitle", $user_popups[b]).not(".chat_video_icon").click(function() {
                    $users[b].click();
                }).children().not(".chat_tab_name").click(function() {
                    return false;
                });
                a(".chat_tabtitle", $user_popups[b]).mouseenter(function() {
                    a(this).addClass("chat_chatboxtabtitlemouseover");
                });
                a(".chat_tabtitle", $user_popups[b]).mouseleave(function() {
                    a(this).removeClass("chat_chatboxtabtitlemouseover");
                });
                $users[b].mouseenter(function() {
                    a(this).addClass("chat_tabmouseover");
                    a("div", $users[b]).addClass("chat_tabmouseovertext");
                });
                $users[b].mouseleave(function() {
                    a(this).removeClass("chat_tabmouseover");
                    a("div", $users[b]).removeClass("chat_tabmouseovertext");
                });
                $users[b].click(function() {
                    lsClick(" ", "ac_openclose", "users['" + b + "']");
                    var tba = 0;
                    if (a(".chat_tabalert", $users[b]).length > 0) {
                        tba = 1;
                        a(".chat_tabalert", $users[b]).remove();
                        $users[b].removeClass("chat_tab_new_message");
                        G[b] = 0;
                        y[b] = 0;
                    }
                    if (a(this).hasClass("chat_tabclick")) {
                        closePopup($user_popups[b], a(this));
                        a(".chat_closebox_bottom", $users[b]).removeClass("chat_closebox_bottom_click");
                        j = "";
                        a.post(c_ac_path + "includes/json/send/send_settings.php", {
                            unfocus_chat: b,
                            tab_alert: 1
                        }, function() {});
                    } else {
                        if (j != "") {
                            closePopup($user_popups[j], $users[j]);
                            a(".chat_closebox_bottom", $users[j]).removeClass("chat_closebox_bottom_click");
                            j = "";
                        }
                        if (!($users[b].offset().left < $chatboxes.offset().left + $chatboxes.width() && $users[b].offset().left - $chatboxes.offset().left >= 0)) {
                            $chatboxes.scrollTo($users[b]);
                            updateRightLastClasses();
                        }
                        if (ca[b] != 1) {
                            receiveHistory(b);
                            ca[b] = 1;
                        }
                        a.post(c_ac_path + "includes/json/send/send_settings.php", {
                            focus_chat: b,
                            tab_alert: tba
                        }, function() {});
                        $user_popups[b].css("left", $users[b].offset().left - $user_popups[b].outerWidth() + $users[b].outerWidth()).css("bottom", "25px");
                        a(this).addClass("chat_tabclick").addClass("chat_usertabclick");
                        $user_popups[b].addClass("chat_tabopen");
                        a(".chat_closebox_bottom", $users[b]).addClass("chat_closebox_bottom_click");
                        j = b;
                        if (W) {
                            $user_popups[j].css("position", "absolute").css("top", parseInt(a(window).height()) - parseInt($user_popups[j].css("bottom")) - parseInt($user_popups[j].height()) + a(window).scrollTop() + "px");
                        }
                    }
                    a(".chat_tabcontenttext", $user_popups[b]).scrollTop(a(".chat_tabcontenttext", $user_popups[b])[0].scrollHeight);
                    getStatus("updatingsession") != 1 && a(".chat_textarea", $user_popups[b]).focus();
                });
                f != 1 && $users[b].click();
                y[b] = 0;
                G[b] = 0;
                if (c_disable_avatars == 1) {
                    a(".chat_avatarbox").hide();
                    a("#chat_setting_names_only").parent("li").hide();
                }
            }
        }

        function formatTimestamp(b) {
            var c = "am",
                d = b.getHours(),
                i = b.getMinutes(),
                e = b.getDate();
            b = b.getMonth();
            var g = d;
            if (d > 11) {
                c = "pm";
            }
            if (d > 12) {
                d -= 12;
            }
            if (d == 0) {
                d = 12;
            }
            if (d < 10) {
                d = d;
            }
            if (i < 10) {
                i = "0" + i;
            }
            var l = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                f = "th";
            if (e == 1 || e == 21 || e == 31) {
                f = "st";
            } else if (e == 2 || e == 22) {
                f = "nd";
            } else if (e == 3 || e == 23) {
                f = "rd";
            }
            if (c_us_time != 1) {
                return e != Na ? "<span class=\"chat_ts\">" + g + ":" + i + " " + e + f + " " + l[b] + "</span>" : "<span class=\"chat_ts\">" + g + ":" + i + "</span>";
            } else {
                return e != Na ? "<span class=\"chat_ts\">" + d + ":" + i + c + " " + e + f + " " + l[b] + "</span>" : "<span class=\"chat_ts\">" + d + ":" + i + c + "</span>";
            }
        }

        function receiveHistory(b, times) {
            if (times) {} else {
                times = 1;
            }
            if (times > 1) {
                a("<div class=\"chat_message_history_loading\" style=\"text-align:center;padding:5px 0;\"><img src=\"" + c_ac_path + "themes/" + u_theme + "/images/img-loading.gif\" alt=\"Loading\" /></div>").prependTo(a("#chat_tabcontenttext_" + b));
            }
            a.ajax({
                cache: false,
                url: c_ac_path + "includes/json/receive/receive_history.php",
                data: {
                    chatbox: b,
                    history: times
                },
                type: "post",
                dataType: "json",
                success: function(c) {
                    a(".chat_message_history_loading").remove();
                    history_ids[b] = 0;
                    numMessages = 0;
                    if (c) {
                        if (times == 1) {
                            a(".chat_tabcontenttext", $user_popups[b]).html("");
                        }
                        last_sent[b] = null;
                        var d = "",
                            i = uc_name[b],
                            init = false;
                        a.each(c, function(e, l) {
                            e == "messages" && a.each(l, function(f, h) {
                                numMessages++;
                                f = "";
                                if (h.self == 1) {
                                    fromname = u_name;
                                    fromid = u_id;
                                    f = " chat_self";
                                    _aa5 = _aa4 = "";
                                    avatar = u_avatar;
                                    tooltip = lang[90];
                                } else {
                                    fromname = i;
                                    fromid = b;
                                    _aa4 = "<a href=\"" + uc_link[b] + "\">";
                                    _aa5 = "</a>";
                                    avatar = uc_avatar[h.from];
                                    tooltip = fromname;
                                }
                                var full_name = fromid;
                                var o = new Date(h.sent * 1000);
                                if (c_show_full_name != "1") {
                                    if (fromname.indexOf(" ") != -1) {
                                        fromname = fromname.slice(0, fromname.indexOf(" "));
                                    }
                                }
                                d += "<div class=\"chat_chatboxmessage chat_clearfix" + f + "\" id=\"chat_message_" + h.id + "\">" + formatTimestamp(o) + "<div class=\"chat_chatboxmessagefrom\"><div class=\"chat_disable_avatars_name\">" + fromname + "</div><img alt=\"" + tooltip + "\" class=\"chat_chatbox_avatar\" src=\"" + avatar + "\" /></div><div class=\"chat_chatboxmessage_wrapper\"><div class=\"chat_chatboxmessagecontent\">" + h.message + "</div></div></div>";
                                last_sent[h.from] = h.sent;
                                last_name[h.from] = full_name;
                                init = true;
                                last_id[h.from] = h.id;
                            });
                        });
                        var current_top_element = a("#chat_tabcontenttext_" + b).children().children().first();
                        if (times > 1) {
                            a(d).prependTo(a("#chat_tabcontenttext_" + b).children("div"));
                        } else {
                            a("#chat_tabcontenttext_" + b).html("<div>" + d + "</div>");
                        }
                        showTimeAndTooltip();
                        if (c_disable_avatars == 1 || a("#chat_setting_names_only :input").is(":checked")) {
                            setAvatarVisibility(1);
                        }
                        var previous_height = 0;
                        current_top_element.prevAll().each(function() {
                            previous_height += a(this).outerHeight();
                        });
                        if (times == 1) {
                            a("#chat_tabcontenttext_" + b).scrollTop(50000);
                        } else {
                            a("#chat_tabcontenttext_" + b).scrollTop(previous_height);
                        }
                        a("#chat_tabcontenttext_" + b).scroll(function() {
                            if (a("#chat_tabcontenttext_" + b).scrollTop() < 50 && history_ids[b] != 1) {
                                history_ids[b] = 1;
                                if (numMessages == 20) {
                                    times++;
                                    receiveHistory(b, times);
                                }
                            }
                        });
                        a(".chat_image_message img").one("load", function() {
                            a("#chat_tabcontenttext_" + b).scrollTop(50000);
                        }).each(function() {
                            if (this.complete) {
                                a(this).load();
                            }
                        });
                    }
                }
            });
        }

        function showTimeAndTooltip() {
            a(".chat_chatbox_avatar").mouseenter(function() {
                showTooltip(a(this), a(this).attr("alt"), false, 55, -38, 1);
            });
            a(".chat_chatbox_avatar").mouseleave(function() {
                hideTooltip();
            });
            a(".chat_chatboxmessage").mouseenter(function() {
                a(this).children(".chat_ts").show();
            });
            a(".chat_chatboxmessage").mouseleave(function() {
                a(this).children(".chat_ts").hide();
            });
            a(".chat_lightbox").click(function() {
                a.slimbox(a(this).attr("data-id"), "<a href=\"" + a(this).attr("data-id") + "\">" + lang[70] + "</a>", {
                    resizeDuration: 1,
                    overlayFadeDuration: 1,
                    imageFadeDuration: 1,
                    captionAnimationDuration: 1
                });
            });
        }

        function showChatroomTime() {
            a(".chat_chatroom_message_avatar").mouseenter(function() {
                showTooltip(a(this), a(this).attr("alt"), false, 50, -28, 1);
            });
            a(".chat_chatroom_message_avatar").mouseleave(function() {
                hideTooltip();
            });
            a(".chat_chatroom_box_message").mouseenter(function() {
                if (a(".chat_chatroom_message_name").is(":visible")) {
                    a(this).children(".chat_chatroom_message_content").children(".chat_ts").addClass("chat_ts_name_fix");
                }
                a(this).children(".chat_chatroom_message_content").children(".chat_ts").show();
            });
            a(".chat_chatroom_box_message").mouseleave(function() {
                a(this).children(".chat_chatroom_message_content").children(".chat_ts").removeClass("chat_ts_name_fix");
                a(this).children(".chat_chatroom_message_content").children(".chat_ts").hide();
            });
            a(".chat_lightbox").click(function() {
                a.slimbox(a(this).attr("data-id"), "<a href=\"" + a(this).attr("data-id") + "\">" + lang[70] + "</a>", {
                    resizeDuration: 1,
                    overlayFadeDuration: 1,
                    imageFadeDuration: 1,
                    captionAnimationDuration: 1
                });
            });
        }

        function notifyNewMessage(b, c, d) {
            if (uc_name[b] == null || uc_name[b] == "") {
                setTimeout(function() {
                    notifyNewMessage(b, c, d);
                }, 500);
            } else {
                receiveUser(b, uc_name[b], uc_status[b], uc_avatar[b], uc_link[b], 1);
                if (d == 1) {
                    if (a(".chat_tabalert", $users[b]).length > 0) {
                        c = parseInt(a(".chat_tabalert", $users[b]).html()) + parseInt(c);
                    }
                }
                if (c == 0) {
                    $users[b].removeClass("chat_tab_new_message");
                    a(".chat_tabalert", $users[b]).remove();
                } else {
                    if (a(".chat_tabalert", $users[b]).length > 0) {
                        a(".chat_tabalert", $users[b]).html(c);
                        if (bounce3 == 1) {
                            bounce3 = 0;
                            a(".chat_tabalert", $users[b]).stop(true, true).effect("bounce", {
                                times: 3,
                                distance: 5
                            }, 200, function() {
                                bounce3 = 1;
                            });
                        }
                    } else {
                        a("<div/>").css("top", "-11px").css("left", "112px").addClass("chat_tabalert").html(c).appendTo($users[b]);
                    }
                    $users[b].removeClass("chat_tab_new_message").addClass("chat_tab_new_message");
                }
                y[b] = c;
                positionTabAlerts();
            }
        }

        function setAvatarVisibility(b) {
            if (b == 1) {
                a(".chat_userlist_avatar").addClass("chat_hide_avatars");
                a(".chat_chatroom_avatar").addClass("chat_hide_avatars");
                a(".chat_chatroom_flyout_avatar").addClass("chat_hide_avatars");
                a(".chat_chatroom_message_avatar").addClass("chat_hide_avatars");
                a(".chat_chatroom_message_name").show();
                a(".chat_chatroom_message_avatar").removeClass("chat_no_names");
                a(".chat_chatbox_avatar").hide();
                a(".chat_disable_avatars_name").show();
                a(".chat_chatboxmessage_wrapper").addClass("chat_chatboxmessage_wrapper2");
                a(".chat_chatboxmessagecontent").addClass("chat_chatboxmessagecontent2");
            } else {
                a(".chat_userlist_avatar").removeClass("chat_hide_avatars");
                a(".chat_chatroom_avatar").removeClass("chat_hide_avatars");
                a(".chat_chatroom_flyout_avatar").removeClass("chat_hide_avatars");
                a(".chat_chatroom_message_avatar").removeClass("chat_hide_avatars");
                a(".chat_chatroom_message_name").hide();
                a(".chat_chatroom_message_avatar").addClass("chat_no_names");
                a(".chat_chatbox_avatar").show();
                a(".chat_disable_avatars_name").hide();
                a(".chat_chatboxmessage_wrapper").removeClass("chat_chatboxmessage_wrapper2");
                a(".chat_chatboxmessagecontent").removeClass("chat_chatboxmessagecontent2");
            }
        }

        function buildBuddyListTab() {
            var d = "";
            $buddy_list_tab = a("<div/>").attr("id", "chat_buddy_list_tab").addClass("chat_bar_button").addClass("chat_bar_right").html(chat.Templates.buddylist_tab()).appendTo($base);
            $userstab_popup = a("<div/>").attr("id", "chat_userstab_popup").addClass("chat_tabpopup").css("display", "none").html(chat.Templates.buddylist_window(d, _ts, acp)).appendTo($body);
            if (c_disable_avatars == 1) {
                a("#chat_name_box").hide();
                a("#chat_setting_names_only").parent("li").hide();
            }
            $buddy_list_tab.css("width", c_width_blist + "px");
            if (c_width_blist <= 25) {
                a("#chat_userstab_text").hide();
            }
            if (c_theme_change != 1) {
                a(".chat_theme_button").hide();
            }
            a(".chat_powered_by").css("display", "none");
            a(".chat_search_friends_text").placeholder();
            if (u_sounds == 1) {
                a("#chat_setting_sound :input").prop("checked", true);
            } else {
                a("#chat_setting_sound").addClass("chat_menu_unchecked");
                a("#chat_setting_sound :input").prop("checked", false);
            }
            if (u_blist_open == 1) {
                a("#chat_setting_window_open :input").prop("checked", true);
            } else {
                a("#chat_setting_window_open").addClass("chat_menu_unchecked");
                a("#chat_setting_window_open :input").prop("checked", false);
            }
            if (u_no_avatars == 1) {
                a("#chat_setting_names_only :input").prop("checked", true);
            } else {
                a("#chat_setting_names_only").addClass("chat_menu_unchecked");
                a("#chat_setting_names_only :input").prop("checked", false);
            }
            u_is_guest == 1 && c_guest_name_change == 1 && u_guest_name == "" && a(".chat_enter_name_wrapper").show();
            a("#chat_guest_name_input").placeholder();
            a("#chat_guest_name_input").keydown(function(h) {
                if (h.keyCode == 13) {
                    a.post(c_ac_path + "includes/json/send/send_settings.php", {
                        chat_name: a(this).val()
                    }, function(data) {
                        if (data != "1") {
                            displayMessage("chat_buddylist_message_flyout", data, "error");
                        } else {
                            a(".chat_enter_name_wrapper").slideUp("fast");
                            u_name = a(this).val();
                        }
                    });
                }
            });
            a(".chat_search_friends_text").keyup(function() {
                a(".chat_search_not_found").remove();
                var i = 1,
                    e = true,
                    l = "",
                    f = a(this).val();
                if (f == "") {
                    a(".chat_userlist").each(function() {
                        l = a(this).attr("id").substr(14);
                        a("#chat_userlist_" + l).removeClass("chat_userlist_hover2").show();
                        a("#chat_userlist_" + l + " > span.chat_userscontentname:icontains('" + f + "')").removeHighlight();
                    });
                    e = false;
                } else {
                    a(".chat_userlist").each(function() {
                        l = a(this).attr("id").substr(14);
                        if (a("#chat_userlist_" + l + " > span.chat_userscontentname:icontains('" + f + "')").length > 0) {
                            a("#chat_userlist_" + l).removeClass("chat_userlist_hover2").show();
                            i == 1 && a("#chat_userlist_" + l).addClass("chat_userlist_hover2");
                            a("#chat_userlist_" + l + " > span.chat_userscontentname:icontains('" + f + "')").removeHighlight();
                            a("#chat_userlist_" + l + " > span.chat_userscontentname:icontains('" + f + "')").highlight(f);
                            e = false;
                            i++;
                        } else {
                            a("#chat_userlist_" + l).hide();
                        }
                    });
                }
                e && a("<div/>").attr("class", "chat_search_not_found chat_nofriends").html(lang[26]).prependTo("#chat_userscontent");
                adjustBarSize();
            });
            a(document).bind("idle.idleTimer", function() {
                if (w != 1) {
                    clearUserStatus();
                    a("#chat_userstab_icon").addClass("chat_user_away2");
                    setUserStatus("away");
                    isAway = 1;
                }
            });
            a(document).bind("active.idleTimer", function() {
                if (w != 1) {
                    clearUserStatus();
                    setUserStatus("available");
                    a("#chat_userstab_icon").addClass("chat_user_available2");
                    isAway = 0;
                }
            });
            a.idleTimer(60000 * chat.IdleTime);
            a("#chat_theme_button").click(function() {
                a("#chat_theme_flyout").toggleClass("chat_theme_flyout_display");
                a(".chat_theme_link").addClass("chat_theme_button_hover");
                a(".chat_theme_link").toggleClass("chat_more_button_selected");
                var theme_switch = a(".chat_themeswitcher").val();
                a.post(c_ac_path + "includes/json/send/send_settings.php", {
                    theme: theme_switch
                }, function(theme) {
                    a("#chat_css").attr({
                        href: c_ac_path + "external.php?type=css&t=" + theme_switch
                    });
                    window.location.reload();
                });
            });
            a("#chat_setting_sound").click(function() {
                lsClick("#chat_setting_sound", "ac_click");
                a(this).toggleClass("chat_menu_unchecked");
                if (a("#chat_setting_sound :input").is(":checked")) {
                    a("#chat_setting_sound :input").prop("checked", false);
                    _soundcheck = -1;
                    u_sounds = 0;
                } else {
                    a("#chat_setting_sound :input").prop("checked", true);
                    _soundcheck = 1;
                    u_sounds = 1;
                }
                a.post(c_ac_path + "includes/json/send/send_settings.php", {
                    sound: _soundcheck
                }, function() {});
            });
            a("#chat_setting_window_open").click(function() {
                a(this).toggleClass("chat_menu_unchecked");
                if (a("#chat_setting_window_open :input").is(":checked")) {
                    a("#chat_setting_window_open :input").prop("checked", false);
                    _windowcheck = -1;
                } else {
                    a("#chat_setting_window_open :input").prop("checked", true);
                    _windowcheck = 1;
                }
                a.post(c_ac_path + "includes/json/send/send_settings.php", {
                    window: _windowcheck
                }, function() {});
            });
            a("#chat_setting_names_only").click(function() {
                lsClick("#chat_setting_names_only", "ac_click");
                a(this).toggleClass("chat_menu_unchecked");
                if (a("#chat_setting_names_only :input").is(":checked")) {
                    a("#chat_setting_names_only :input").prop("checked", false);
                    setAvatarVisibility(0);
                    _namecheck = -1;
                } else {
                    a("#chat_setting_names_only :input").prop("checked", true);
                    setAvatarVisibility(1);
                    _namecheck = 1;
                }
                a.post(c_ac_path + "includes/json/send/send_settings.php", {
                    name: _namecheck
                }, function() {});
            });
            a("#chat_setting_block_list").click(function() {
                a(this).parent().parent(".chat_inner_menu").hide();
                a(".chat_block_menu").show();
                a.ajax({
                    url: c_ac_path + "includes/json/receive/receive_block_list.php",
                    type: "get",
                    cache: false,
                    dataType: "json",
                    success: function(b) {
                        if (b && b != null) {
                            a(".chat_block_menu select").html("");
                            a("<option/>").attr("value", "0").html(lang[118]).appendTo(a(".chat_block_menu select"));
                            a.each(b, function(e, l) {
                                a.each(l, function(f, h) {
                                    a("<option/>").attr("value", h.id).html(h.username).appendTo(a(".chat_block_menu select"));
                                });
                            });
                        }
                    }
                });
            });
            a("#chat_unblock_button").click(function() {
                a(".chat_panel_item").click();
                var unblock_chat_user = a(".chat_block_menu select").val();
                if (unblock_chat_user != "0") {
                    a.post(c_ac_path + "includes/json/send/send_settings.php", {
                        unblock_chat: unblock_chat_user
                    }, function() {
                        if (typeof blockList[unblock_chat_user] != "undefined") {
                            blockList.splice(unblock_chat_user, 1);
                        }
                        loadBuddyList();
                    });
                }
            });
            preventScrolling(a("#chat_userscontent"));
            a(".chat_theme_link").mouseenter(function() {
                showTooltip(a(this), lang[94], 0, 10, 5);
                a(this).parent().addClass("chat_theme_button_hover");
                a("#chat_userstab_popup .chat_userstabtitle").removeClass("chat_chatboxtabtitlemouseover2");
            });
            a(".chat_theme_link").mouseleave(function() {
                hideTooltip();
                a(this).parent().removeClass("chat_theme_button_hover");
                a("#chat_userstab_popup .chat_userstabtitle").addClass("chat_chatboxtabtitlemouseover2");
            });
            a(".chat_theme_link").click(function() {
                hideTooltip();
                a("#chat_userscontent").height() < 150 ? a("#chat_theme_wrapper").addClass("flyout_reversed") : a("#chat_theme_wrapper").removeClass("flyout_reversed");
                a("#chat_theme_flyout").toggleClass("chat_theme_flyout_display");
                a(this).addClass("chat_theme_button_hover");
                a(this).toggleClass("chat_more_button_selected");
                if (a(".chat_panel_item").hasClass("chat_more_button_selected")) {
                    a(".chat_panel_item").toggleClass("chat_more_button_selected");
                    a("#chat_options_flyout").toggleClass("chat_options_flyout_display");
                }
            });
            a(".chat_panel_item").mouseenter(function() {
                showTooltip(a(this), lang[23], 0, 10, 5);
                a(this).parent().addClass("chat_more_button_hover");
                a("#chat_userstab_popup .chat_userstabtitle").removeClass("chat_chatboxtabtitlemouseover2");
            });
            a(".chat_panel_item").mouseleave(function() {
                hideTooltip();
                a(this).parent().removeClass("chat_more_button_hover");
                a("#chat_userstab_popup .chat_userstabtitle").addClass("chat_chatboxtabtitlemouseover2");
            });
            a(".chat_panel_item").click(function() {
                hideTooltip();
                a("#chat_userscontent").height() < 150 ? a("#chat_options_wrapper").addClass("flyout_reversed") : a("#chat_options_wrapper").removeClass("flyout_reversed");
                a("#chat_options_flyout").toggleClass("chat_options_flyout_display");
                a(this).addClass("chat_more_button_hover");
                a(this).toggleClass("chat_more_button_selected");
                if (a(".chat_theme_link").hasClass("chat_more_button_selected")) {
                    a(".chat_theme_link").toggleClass("chat_more_button_selected");
                    a("#chat_theme_flyout").toggleClass("chat_theme_flyout_display");
                }
                a("#chat_options_flyout").children(".chat_inner_menu").show();
                a(".chat_block_menu").hide();
            });
            addHover(a(".chat_menu_item"), "chat_more_hover");
            a("#chat_gooffline").click(function() {
                lsClick("#chat_gooffline", "ac_click");
                a(".chat_panel_item").click();
                a(".chat_userstabtitle").toggleClass("chat_userstabtitle_button_click");
                pushCancelAll();
                cancelJSONP();
                a.idleTimer("destroy");
                clearTimeout(Z);
                if (j != "") {
                    closePopup($user_popups[j], $users[j]);
                    a(".chat_closebox_bottom", $users[j]).removeClass("chat_closebox_bottom_click");
                    j = "";
                }
                a("#chat_panel_options").removeClass("chat_panel_hover");
                showUserOffline();
                a("#chat_userstab_icon").addClass("chat_user_invisible2");
                $chatboxes.hide();
            });
            a("#chat_userstab_popup .chat_userstabtitle").click(function() {
                $buddy_list_tab.click();
            }).children().not(".chat_tab_name").click(function() {
                return false;
            });
            a("#chat_userstab_popup .chat_userstabtitle").mouseenter(function() {
                a(this).addClass("chat_chatboxtabtitlemouseover2");
            });
            a("#chat_userstab_popup .chat_userstabtitle").mouseleave(function() {
                a(this).removeClass("chat_chatboxtabtitlemouseover2");
            });
            $buddy_list_tab.mouseover(function() {
                if (c_width_blist <= 25) {
                    if ($buddy_list_tab.hasClass("chat_tabclick")) {} else {
                        showTooltip($buddy_list_tab, lang[4]);
                    }
                }
                a(this).addClass("chat_tabmouseover");
            });
            $buddy_list_tab.mouseout(function() {
                a(this).removeClass("chat_tabmouseover");
                hideTooltip();
            });
            $buddy_list_tab.click(function() {
                lsClick("#chat_buddy_list_tab", "ac_openclose");
                if (c_width_blist <= 25) {
                    hideTooltip();
                }
                closePopup($chatrooms_popup, $chatrooms_button);
                if (w == 1 || bli == 1) {
                    clearTimeout(Z);
                    loadBuddyList();
                    bli = 0;
                }
                if (w == 1) {
                    w = 0;
                    a("#chat_userstab_text").html("<b>" + lang[4] + "</b> (<b>" + R + "</b>)");
                    receiveCore();
                    pushSubscribe();
                    a.idleTimer(60000 * chat.IdleTime);
                    setUserStatus("available");
                    a("#chat_userstab_icon").addClass("chat_user_available2");
                    $chatboxes.show();
                }
                closePopup($optionsbutton_popup, $optionsbutton);
                closePopup($modbutton_popup, $modbutton);
                $userstab_popup.css("left", $buddy_list_tab.offset().left - $userstab_popup.outerWidth() + $buddy_list_tab.outerWidth()).css("bottom", "25px");
                a(this).toggleClass("chat_tabclick").toggleClass("chat_userstabclick");
                $userstab_popup.toggleClass("chat_tabopen");
                adjustBuddyListSize();
            });
        }

        function startPopoutChat() {
            pushCancelAll();
            cancelJSONP();
            a.idleTimer("destroy");
            clearTimeout(Z);
            $buddy_list_tab.hide();
            $popout_chat_button.show();
            $chatboxes.hide();
            $chatbox_right.hide();
            $chatbox_left.hide();
            closePopup($userstab_popup, $buddy_list_tab);
            closePopup($optionsbutton_popup, $optionsbutton);
            closePopup($modbutton_popup, $modbutton);
            closePopup($chatrooms_popup, $chatrooms_button);
            if (j != "") {
                closePopup($user_popups[j], $users[j]);
                a(".chat_closebox_bottom", $users[j]).removeClass("chat_closebox_bottom_click");
                j = "";
            }
            a.post(c_ac_path + "includes/json/send/send_settings.php", {
                popoutchat: "1"
            }, function() {});
        }

        function adjustBuddyListSize() {
            var searchHeight = 0,
                nameHeight = 0,
                poweredHeight = 0;
            if (a("#chat_search_friends").is(":visible")) {
                searchHeight = a("#chat_search_friends").outerHeight();
            }
            if (a(".chat_enter_name_wrapper").is(":visible")) {
                nameHeight = a(".chat_enter_name_wrapper").outerHeight();
            }
            if (a(".chat_powered_by").is(":visible")) {
                poweredHeight = a(".chat_powered_by").outerHeight();
            }
            if (a(window).outerHeight() - a("#chat_userscontent")[0].scrollHeight <= c_window_top_padding + searchHeight + nameHeight + poweredHeight && a("#chat_userscontent").outerHeight() <= a("#chat_userslist_available").outerHeight() + a("#chat_userslist_away").outerHeight() + a("#chat_userslist_busy").outerHeight() + a("#chat_userslist_offline").outerHeight() + a("#chat_site_users").outerHeight(true)) {
                a("#chat_userscontent").css("height", a(window).outerHeight() - (c_window_top_padding + searchHeight + nameHeight + poweredHeight) + "px");
            } else {
                a("#chat_userscontent").css("height", "auto");
            }
        }

        function adjustBarSize() {
            if (c_chat_maintenance != 1 && u_id != "") {
                if ($optionsbutton_popup !== undefined) {
                    var d = 0;
                    a(".chat_notification_message_div").each(function() {
                        d += parseInt(a(this).outerHeight()) + 5;
                    });
                    if (a(window).height() - a("#chat_notifications_content")[0].scrollHeight <= c_window_top_padding && a("#chat_notifications_content").outerHeight() <= d) {
                        a("#chat_notifications_content").css("height", a(window).height() - c_window_top_padding + "px");
                    } else {
                        a("#chat_notifications_content").css("height", "auto");
                    }
                }
                adjustBuddyListSize();
            }
            var b = a(window).width(),
                c = 0;
            $chatbox_right.hasClass("chat_chatbox_lr") || (c = 19);
            for (d = 0; d < barLinks.length; d++) {
                c += a("#chat_trayicon_" + d).outerWidth();
            }
            if ($optionsbutton !== undefined) {
                c += $optionsbutton.outerWidth();
            }
            if ($modbutton !== undefined) {
                c += $modbutton.outerWidth();
            }
            if ($chatrooms_button !== undefined) {
                c += $chatrooms_button.outerWidth();
            }
            if (a("#chat_hide_bar_button") !== undefined) {
                c += a("#chat_hide_bar_button").outerWidth();
            }
            var i = 0;
            for (bha in apps) {
                if (apps[bha][12] != "1" && typeof $application_buttons[apps[bha][0]] != "undefined") {
                    c += $application_buttons[apps[bha][0]].outerWidth();
                }
            }
            if ($applications_button !== undefined) {
                c += $applications_button.outerWidth();
            }
            if (c_no_apps_menu == 1) {
                c += 130;
            }
            if (barLinks.length > 0 && i > 0) {
                c += 30;
            }
            positionBar(c);
            if (c_chat_maintenance != 1 && u_id != "") {
                if ($chatboxes_wide.width() <= $base.width() - 250 - c) {
                    $chatboxes.css("width", $chatboxes_wide.width());
                    $chatboxes.scrollTo("0px", 0);
                } else {
                    b = $chatboxes.width();
                    var chatboxes_width_value = Math.floor(($base.width() - 250 - c) / 148) * 148;
                    if (chatboxes_width_value < 148) {
                        chatboxes_width_value = 148;
                    }
                    $chatboxes.css("width", chatboxes_width_value + "px");
                    c = $chatboxes.width();
                    b != c && $chatboxes.scrollTo("-=148px", 0);
                }
                c_notifications != 0 && $optionsbutton_popup.css("left", $optionsbutton.offset().left - $optionsbutton_popup.outerWidth() + $optionsbutton.outerWidth()).css("bottom", "25px");
                c_enable_moderation == 1 && u_is_mod == 1 && $modbutton_popup.css("left", $modbutton.offset().left - $modbutton_popup.outerWidth() + $modbutton.outerWidth()).css("bottom", "25px");
                c_chatrooms != 0 && $chatrooms_popup.css("left", $chatrooms_button.offset().left - $chatrooms_popup.outerWidth() + $chatrooms_button.outerWidth()).css("bottom", "25px");
                if (typeof $applications_button_popup != "undefined") {
                    c_applications_on != 0 && $applications_button_popup.css("left", $applications_button.offset().left).css("bottom", "25px");
                }
                $userstab_popup.css("left", $buddy_list_tab.offset().left - $userstab_popup.outerWidth() + $buddy_list_tab.outerWidth()).css("bottom", "25px");
                if (m != "") {
                    $application_button_popups[m].css("left", $application_buttons[m].offset().left).css("bottom", "25px");
                }
                if (j != "") {
                    if ($users[j].offset().left < $chatboxes.offset().left + $chatboxes.width() && $users[j].offset().left - $chatboxes.offset().left >= 0) {
                        $user_popups[j].css("left", $users[j].offset().left - $user_popups[j].outerWidth() + $users[j].outerWidth()).css("bottom", "25px");
                    } else {
                        closePopup($user_popups[j], $users[j]);
                        c = $users[j].offset().left - $chatboxes_wide.offset().left - (Math.floor($chatboxes.width() / 148) - 1) * 148;
                        $chatboxes.scrollTo(c, 0, function() {
                            if (typeof $users[j] != "undefined") {
                                $users[j].click();
                            }
                        });
                    }
                }
                positionTabAlerts();
                updateRightLastClasses();
                W && positionchat();
            }
        }

        function positionBar(apps_tray_width) {
            var window_width = a(window).width();
            if (c_bar_fixed == 1) {
                $base.css("width", c_bar_fixed_width);
                if (c_bar_fixed_alignment == "left") {
                    $base.css("left", c_bar_padding);
                }
                if (c_bar_fixed_alignment == "center") {
                    var left_value = (window_width - c_bar_fixed_width) / 2;
                    $base.css("left", left_value);
                }
                if (c_bar_fixed_alignment == "right") {
                    var left_value = window_width - c_bar_fixed_width;
                    $base.css("left", left_value - c_bar_padding);
                }
            } else {
                var check_width = parseInt(450) + parseInt(apps_tray_width) + parseInt(c_bar_padding * 2);
                if (window_width < check_width) {
                    window_width = check_width;
                }
                $base.css("left", c_bar_padding + "px");
                $base.css("width", window_width - c_bar_padding * 2);
            }
        }

        function positionTabAlerts() {
            var $left = a(".chat_tabalertlr", $chatbox_left);
            var $right = a(".chat_tabalertlr", $chatbox_right);
            $left.html("0").css("display", "none");
            $right.html("0").css("display", "none");
            a(".chat_tabalert").each(function() {
                if (a(this).parent().attr("id") != "chat_chatrooms_button" && !a(this).parent().hasClass("chat_apps_button")) {
                    if (a(this).parent().offset().left < $chatboxes.offset().left + $chatboxes.width() && a(this).parent().offset().left - $chatboxes.offset().left >= 0) {
                        a(this).css("display", "block");
                    } else {
                        a(this).css("display", "none");
                        if (a(this).parent().offset().left - $chatboxes.offset().left >= 0) {
                            var b = $chatbox_right.offset().left + $chatbox_right.width() - 30;
                            $right.html(parseInt(a(".chat_tabalertlr", $chatbox_right).html()) + parseInt(a(this).html())).css({
                                display: "block",
                                left: b
                            });
                        } else {
                            b = $chatbox_left.offset().left + $chatbox_left.width() - 22;
                            $left.html(parseInt(a(".chat_tabalertlr", $chatbox_left).html()) + parseInt(a(this).html())).css({
                                display: "block",
                                left: b
                            });
                        }
                    }
                }
            });
        }

        function updateRightLastClasses() {
            var b = 0,
                right_last = false,
                lr = false;
            if ($chatbox_right.hasClass("chat_chatbox_right_last")) {
                right_last = true;
            }
            if ($chatbox_right.hasClass("chat_chatbox_lr")) {
                lr = true;
            }
            if ($chatboxes.scrollLeft() == 0) {
                a(".chat_tabtext", $chatbox_left).html("0");
                $chatbox_left.addClass("chat_chatbox_left_last");
                a(".chat_previous_tab").addClass("chat_previous_tab_last");
                b++;
            } else {
                var i = Math.floor($chatboxes.scrollLeft() / 148);
                a(".chat_tabtext", $chatbox_left).html(i);
                $chatbox_left.removeClass("chat_chatbox_left_last");
                a(".chat_previous_tab").removeClass("chat_previous_tab_last");
            }
            if ($chatboxes.scrollLeft() + $chatboxes.width() == $chatboxes_wide.width()) {
                a(".chat_tabtext", $chatbox_right).html("0");
                $chatbox_right.addClass("chat_chatbox_right_last");
                a(".chat_next_tab").addClass("chat_next_tab_last");
                b++;
            } else {
                i = Math.floor(($chatboxes_wide.width() - ($chatboxes.scrollLeft() + $chatboxes.width())) / 148);
                a(".chat_tabtext", $chatbox_right).html(i);
                $chatbox_right.removeClass("chat_chatbox_right_last");
                a(".chat_next_tab").removeClass("chat_next_tab_last");
            }
            if (b == 2) {
                $chatbox_right.addClass("chat_chatbox_lr");
                $chatbox_left.addClass("chat_chatbox_lr");
            } else {
                $chatbox_right.removeClass("chat_chatbox_lr");
                $chatbox_left.removeClass("chat_chatbox_lr");
            }
            if (!$chatbox_right.hasClass("chat_chatbox_right_last") && right_last || $chatbox_right.hasClass("chat_chatbox_right_last") && !right_last || !$chatbox_right.hasClass("chat_chatbox_lr") && lr || $chatbox_right.hasClass("chat_chatbox_lr") && !lr) {
                adjustBarSize();
            }
        }

        function scrollChatboxes(b) {
            if (j != "") {
                closePopup($user_popups[j], $users[j]);
            }
            a(".chat_tabalert").css("display", "none");
            var c = 100;
            if (get("initialize") == 1) {
                c = 0;
            }
            $chatboxes.scrollTo(b, c, function() {
                if (j != "") {
                    if ($users[j].offset().left < $chatboxes.offset().left + $chatboxes.width() && $users[j].offset().left - $chatboxes.offset().left >= 0) {
                        $users[j].click();
                    } else {
                        j = "";
                    }
                }
                positionTabAlerts();
                updateRightLastClasses();
            });
        }

        function set(b, c) {
            V[b] = c;
        }

        function get(b) {
            return V[b] ? V[b] : "";
        }

        function getStatus(b) {
            return xa[b] ? xa[b] : "";
        }

        function receiveUserFromUserlist(b) {
            if (a(b).attr("id")) {
                var c = a(b).attr("id").substr(14);
            } else {
                var c = "";
            }
            if (c == "") {
                c = a(b).parent().attr("id").substr(14);
            }
            receiveUser(c, uc_name[c], uc_status[c], uc_avatar[c], uc_link[c]);
            lsClick("#chat_userlist_" + c, "ac_click");
        }

        function chatroomListClicked(b) {
            if ($chatroom_create_flyout.is(":visible")) {
                $chatroom_create_flyout.hide("slide", {
                    direction: "up"
                }, 250);
            }
            c = "";
            if (a(b).attr("id")) {
                c = a(b).attr("id").substr(14);
            }
            if (c == "") {
                c = a(b).parent().attr("id").substr(14);
            }
            if (crt[c] == 2) {
                a("#chat_chatroom_password_id").val(c);
                if (a("#chat_chatroom_" + c).hasClass("chat_chatroom_clicked")) {
                    a("#chat_chatroom_password_flyout").hide("slide", {
                        direction: "up"
                    }, 250);
                    a(".chat_chatroom_list").removeClass("chat_chatroom_clicked");
                } else {
                    a(".chat_chatroom_list").removeClass("chat_chatroom_clicked");
                    a("#chat_chatroom_" + c).addClass("chat_chatroom_clicked");
                    if (!a("#chat_chatroom_password_flyout").is(":visible")) {
                        a("#chat_chatroom_password_flyout").show("slide", {
                            direction: "up"
                        }, 250, function() {
                            a("#chat_chatroom_password_input").focus();
                        });
                    } else {
                        a("#chat_chatroom_password_flyout").hide("slide", {
                            direction: "up"
                        }, 250);
                        a("#chat_chatroom_password_flyout").show("slide", {
                            direction: "up"
                        }, 250, function() {
                            a("#chat_chatroom_password_input").focus();
                        });
                    }
                }
            } else {
                a(".chat_chatroom_full_content").html("<div class=\"chat_nofriends\"><div class=\"chat_loading_icon\"></div>" + lang[34] + "</div>");
                if (a("#chat_chatroom_password_flyout").is(":visible")) {
                    a("#chat_chatroom_password_flyout").hide("slide", {
                        direction: "up"
                    }, 250);
                }
                $chatroom_create.hide();
                Ccr = c;
                loadChatroom(c, crt[c]);
            }
        }

        function addMessageToChatroom(b, c, d) {
            var title = "",
                important = "";
            if (chatroom_mod == 1) {
                title = lang[137];
                important = " chat_chatroom_important";
            }
            if (chatroom_admin == 1) {
                title = lang[136];
                important = " chat_chatroom_important";
            }
            d = d.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>").replace(/\"/g, "&quot;");
            d = replaceURLWithHTMLLinks(d);
            d = smileyreplace(d);
            if (a("#chat_chatroom_message_" + b).length > 0) {} else {
                $chatroom_chat.append("<div class=\"chat_chatroom_box_message chat_clearfix chat_self" + important + "\" id=\"chat_chatroom_message_" + b + "\"><img class=\"chat_chatroom_message_avatar chat_no_names\" src=\"" + u_avatar + "\" alt=\"" + c + title + "\" /><div class=\"chat_chatroom_message_name\">" + c + title + ":</div><div class=\"chat_chatroom_message_content\"><div class=\"chat_chatroom_delete\" data-id=\"" + b + "\"> </div>" + formatTimestamp(new Date(Math.floor((new Date).getTime() / 1000) * 1000)) + "<span class=\"chat_chatroom_msg\">" + d + "</span></div></div>");
                $chatroom_chat.scrollTop(50000);
            }
            showChatroomTime();
            modDeleteControls();
        }

        function addMessageToChatbox(b, c, d, i, e, l, f) {
            aa[b] != 1 && receiveUser(b, uc_name[b], uc_status[b], uc_avatar[b], uc_link[b], 1, 1);
            if (uc_name[b] == null || uc_name[b] == "") {
                setTimeout(function() {
                    addMessageToChatbox(b, c, d, i, e, l, f);
                }, 500);
            } else {
                var h = "",
                    init = false;
                if (parseInt(d) == 1) {
                    fromname = u_name;
                    fromid = u_id;
                    h = " chat_self";
                    avatar = u_avatar;
                    tooltip = lang[90];
                } else {
                    fromname = uc_name[b];
                    fromid = b;
                    avatar = uc_avatar[b];
                    tooltip = fromname;
                }
                var full_name = fromid;
                if (parseInt(l) == 1) {
                    c = c.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>").replace(/\"/g, "&quot;");
                }
                c = replaceURLWithHTMLLinks(c);
                c = smileyreplace(c);
                d != 1 && u_sounds == 1 && !a(".chat_textarea", $user_popups[b]).is(":focus") && playNewMessageSound();
                separator = ":&nbsp;&nbsp;";
                if (a("#chat_message_" + e).length > 0) {
                    a("#chat_message_" + e + " .chat_chatboxmessagecontent").html(c);
                } else {
                    if (c_show_full_name != "1") {
                        if (fromname.indexOf(" ") != -1) {
                            fromname = fromname.slice(0, fromname.indexOf(" "));
                        }
                    }
                    if (uc_status[b] == "offline" && d != 1) {
                        displayMessage("chat_chatbox_message_flyout_" + b, lang[13], "error");
                    }
                    a(".chat_tabcontenttext", $user_popups[b]).append("<div class=\"chat_chatboxmessage chat_clearfix" + h + "\" id=\"chat_message_" + e + "\">" + formatTimestamp(new Date(f * 1000)) + "<div class=\"chat_chatboxmessagefrom\"><div class=\"chat_disable_avatars_name\">" + fromname + "</div><img alt=\"" + tooltip + "\" class=\"chat_chatbox_avatar\" src=\"" + avatar + "\" /></div><div class=\"chat_chatboxmessage_wrapper\"><div class=\"chat_chatboxmessagecontent\">" + c + "</div></div></div>");
                    last_sent[b] = f;
                    last_name[b] = full_name;
                    last_id[b] = e;
                    if (c_disable_avatars == 1 || a("#chat_setting_names_only :input").is(":checked")) {
                        setAvatarVisibility(1);
                    }
                    a("#chat_tabcontenttext_" + b).scrollTop(50000);
                    showTimeAndTooltip();
                }
                j != b && d != 1 && i != 1 && notifyNewMessage(b, 1, 1);
                d != 1 && showDesktopNotification(b, c, e);
            }
        }

        function activateUser(b) {
            if (uc_name[b] == null || uc_name[b] == "") {
                setTimeout(function() {
                    activateUser(b);
                }, 500);
            } else {
                j != b && $users[b].click();
            }
        }

        function addMessageToContent(b, c) {
            if (uc_name[b] == null || uc_name[b] == "") {
                setTimeout(function() {
                    addMessageToContent(b, c);
                }, 500);
            } else {
                a("#chat_tabcontenttext_" + b).append("<div>" + c + "</div>");
                a("#chat_tabcontenttext_" + b).scrollTop(50000);
                G[b] = 1;
            }
        }

        function loadChatroomList() {
            if (chatroomreceived == 0) {
                a(".chat_chatroom_content").addClass("chat_chatroom_lobby");
                a("#chat_chatroom_leave").hide();
                a(".chat_chatroom_popout").hide();
                a.ajax({
                    url: c_ac_path + "includes/json/receive/receive_chatroom_list.php",
                    cache: false,
                    data: {
                        chatroom_window: u_chatroom_open,
                        chatroom_stay: u_chatroom_stay
                    },
                    type: "post",
                    dataType: "json",
                    success: function(b) {
                        buildChatroomList(b);
                    }
                });
            }
        }

        function buildChatroomList(b) {
            Ccr = 0;
            a(".chat_chatroom_full_content").html("");
            var c = {};
            b && a.each(b, function(i, e) {
                if (i == "chatrooms") {
                    a.each(e, function(l, f) {
                        a("<div/>").attr("id", "chat_chatroom_" + f.id).mouseover(function() {
                            a(this).addClass("chat_chatroom_list_hover");
                        }).mouseout(function() {
                            a(this).removeClass("chat_chatroom_list_hover");
                        }).addClass("chat_chatroom_list").html("<div class=\"chat_chatroom_image\"><img src=\"" + c_ac_path + "themes/" + u_theme + "/images/icons/" + f.img + "\" alt=\"\" /></div><div class=\"chat_chatroom_name_wrapper\"><div class=\"chat_chatroom_name\">" + f.n + "</div><div class=\"chat_chatroom_desc\">" + f.d + "</div></div><span class=\"chat_chatroom_status chat_chatroom_" + f.t + "\"></span><span class=\"chat_chatroom_count\">" + f.c + lang[35] + "</span><div class=\"chat_clearfix\"></div>").appendTo(a(".chat_chatroom_full_content"));
                        crt[f.id] = f.t;
                        crt2[f.id] = f.n;
                    });
                }
            });
            chatroomreceived = 1;
            a(".chat_chatroom_list").click(function(l) {
                chatroomListClicked(a(this));
            });
        }

        function receiveChatroom(c) {
            var global_mod = 0,
                global_admin = 0,
                admin_markup = "";
            chatroom_mod = 0;
            chatroom_admin = 0;
            if (Ccr == c) {
                a.ajax({
                    url: c_ac_path + "includes/json/receive/receive_chatroom.php",
                    cache: false,
                    type: "post",
                    data: {
                        chatroomid: c
                    },
                    dataType: "json",
                    success: function(b) {
                        if (b) {
                            var no_error = true;
                            b && a.each(b, function(i, e) {
                                if (i == "error") {
                                    a.each(e, function(l, f) {
                                        no_error = false;
                                        Ccr = 0;
                                        chatroomreceived = 0;
                                        loadChatroomList();
                                        displayMessage("chat_chatroom_message_flyout", f.m, "error");
                                    });
                                }
                            });
                            if (no_error) {
                                b && a.each(b, function(i, e) {
                                    if (i == "user_title") {
                                        a.each(e, function(l, f) {
                                            if (f.admin == 1) {
                                                global_admin = 1;
                                                chatroom_admin = 1;
                                            }
                                            if (f.mod == 1) {
                                                global_mod = 1;
                                                chatroom_mod = 1;
                                            }
                                        });
                                    }
                                    if (i == "chat_users") {
                                        var longname, adminCount = 0,
                                            modCount = 0,
                                            userCount = 0;
                                        $chatroom_room_list.html("<div id=\"chat_chatroom_line_admins\" class=\"chat_group_container\"><span class=\"chat_group_text\">" + lang[148] + "</span><div class=\"chat_group_line_container\"><span class=\"chat_group_line\"></span></div></div><div id=\"chat_chatroom_list_admins\"></div><div id=\"chat_chatroom_line_mods\" class=\"chat_group_container\"><span class=\"chat_group_text\">" + lang[149] + "</span><div class=\"chat_group_line_container\"><span class=\"chat_group_line\"></span></div></div><div id=\"chat_chatroom_list_mods\"></div><div id=\"chat_chatroom_line_users\" class=\"chat_group_container\"><span class=\"chat_group_text\">" + lang[147] + "</span><div class=\"chat_group_line_container\"><span class=\"chat_group_line\"></span></div></div><div id=\"chat_chatroom_list_users\"></div>");
                                        a.each(e, function(l, f) {
                                            if ((global_admin == 1 || global_mod == 1) && (f.t == 1 || f.t == 4)) {
                                                admin_markup = "<hr class=\"chat_options_divider\" /><div class=\"chat_chatroom_options_padding\"><div id=\"chat_chatroom_make_mod_" + f.id + "\" class=\"chat_chatroom_flyout_text\">" + lang[52] + "</div></div><div class=\"chat_chatroom_options_padding\"><div id=\"chat_chatroom_silence_user_" + f.id + "\" class=\"chat_chatroom_flyout_text\">" + lang[161] + "</div></div><div class=\"chat_chatroom_options_padding\"><div id=\"chat_chatroom_ban_user_" + f.id + "\" class=\"chat_chatroom_flyout_text\">" + lang[53] + "</div></div>";
                                            }
                                            if (global_admin == 1 && f.t == 2) {
                                                admin_markup = "<hr class=\"chat_options_divider\" /><div class=\"chat_chatroom_options_padding\"><div id=\"chat_chatroom_remove_mod_" + f.id + "\" class=\"chat_chatroom_flyout_text\">" + lang[54] + "</div></div>";
                                            }
                                            appendVal = a("#chat_chatroom_list_users");
                                            if (f.t == 2) {
                                                appendVal = a("#chat_chatroom_list_mods");
                                                modCount++;
                                            } else if (f.t == 3) {
                                                appendVal = a("#chat_chatroom_list_admins");
                                                adminCount++;
                                            } else {
                                                userCount++;
                                            }
                                            longname = renderHTMLString(f.n);
                                            f.n = renderHTMLString(f.n).length > 16 ? renderHTMLString(f.n).substr(0, 16) + "..." : f.n;
                                            a("<div/>").attr("id", "chat_chatroom_user_" + f.id).mouseover(function() {
                                                a(this).addClass("chat_chatroom_list_hover");
                                            }).mouseout(function() {
                                                a(this).removeClass("chat_chatroom_list_hover");
                                            }).addClass("chat_chatroom_room_list").addClass("chat_chatroom_admin_" + f.t).html("<img class=\"chat_chatroom_avatar\" src=\"" + f.a + "\"/><span class=\"chat_chatroom_room_name\">" + f.n + "</span><span class=\"chat_userscontentdot chat_" + f.status + "\"></span>").appendTo(appendVal);
                                            var pm_opacity = "";
                                            if (f.b == 1 && global_admin != 1 || f.id == u_id) {
                                                pm_opacity = " chat_no_private_msg";
                                            }
                                            a("<div/>").attr("id", "chat_chatroom_users_flyout_" + f.id).addClass("chat_more_wrapper_chatroom").html("<div class=\"chat_chatroom_users_flyout\"><div class=\"chat_chatroom_flyout_avatar\"><img src=\"" + f.a + "\" alt=\"\" /></div><div class=\"chat_chatroom_flyout_info\"><div class=\"chat_chatroom_title_padding\"><div id=\"chat_chatroom_title_" + f.id + "\" class=\"chat_chatroom_flyout_text\"><a href=\"" + f.l + "\">" + longname + "</a><br/>" + lang[43] + "</div></div><hr class=\"chat_options_divider\"/><div class=\"chat_chatroom_options_padding\"><div id=\"chat_chatroom_private_message_" + f.id + "\" class=\"chat_chatroom_flyout_text" + pm_opacity + "\">" + lang[41] + "</div></div><div class=\"chat_chatroom_options_padding\"><div id=\"chat_chatroom_block_user_" + f.id + "\" class=\"chat_chatroom_flyout_text\">" + lang[84] + "</div></div><div class=\"chat_chatroom_options_padding\"><div id=\"chat_chatroom_report_user_" + f.id + "\" class=\"chat_chatroom_flyout_text\">" + lang[167] + "</div></div>" + admin_markup + "</div><div class=\"chat_clearfix\"></div><i class=\"chat_more_tip_chatroom\"></i></div>").appendTo(a("#chat_chatroom_user_" + f.id));
                                            if (f.t == 2) {
                                                a("#chat_chatroom_title_" + f.id).html("<a href=\"" + f.l + "\">" + longname + "</a><br/>" + lang[44]);
                                            } else if (f.t == 3) {
                                                a("#chat_chatroom_title_" + f.id).html("<a href=\"" + f.l + "\">" + longname + "</a><br/>" + lang[45]);
                                            } else if (f.t == 4) {
                                                a("#chat_chatroom_title_" + f.id).html("<a href=\"" + f.l + "\">" + longname + "</a><br/>" + lang[212]);
                                            }
                                            addHover(a(".chat_chatroom_options_padding"), "chat_options_padding_hover");
                                            chatroomUserOptions(f, global_admin);
                                            uc_avatar[f.id] = f.a;
                                        });
                                        userCount == 0 && a("#chat_chatroom_line_users").hide();
                                        adminCount == 0 && a("#chat_chatroom_line_admins").hide();
                                        modCount == 0 && a("#chat_chatroom_line_mods").hide();
                                        a(".chat_chatroom_admin_3").css("background-color", "#" + c_admin_bg);
                                        a(".chat_chatroom_admin_3").css("color", "#" + c_admin_txt);
                                    }
                                });
                                modDeleteControls();
                                if (global_admin == 1 || global_mod == 1) {
                                    if (!a(".chat_chatroom_admin_menu").length || !a(".chat_flood_menu").length) {
                                        addChatroomAdminControls();
                                    }
                                } else {
                                    if ($chatroom_admin_controls.length) {
                                        $chatroom_admin_controls.remove();
                                    }
                                }
                                if (c_disable_avatars == 1 || a("#chat_setting_names_only :input").is(":checked")) {
                                    a(".chat_chatroom_avatar").addClass("chat_hide_avatars");
                                    a(".chat_chatroom_message_avatar").addClass("chat_hide_avatars");
                                    a(".chat_chatroom_flyout_avatar").addClass("chat_hide_avatars");
                                    a(".chat_chatroom_message_name").show();
                                    a(".chat_chatroom_message_avatar").removeClass("chat_no_names");
                                }
                                if (a("#chat_chatroom_show_names :input").is(":checked")) {
                                    a(".chat_chatroom_message_name").show();
                                    a(".chat_chatroom_message_avatar").removeClass("chat_no_names");
                                }
                            }
                        }
                    }
                });
                clearTimeout(Crref2);
                Crref2 = setTimeout(function() {
                    receiveChatroom(c);
                }, 60000);
            }
        }

        function chatroomUserOptions(data, is_admin) {
            a("#chat_chatroom_make_mod_" + data.id).click(function() {
                a.post(c_ac_path + "includes/json/send/send_settings.php", {
                    chatroom_mod: data.id,
                    chatroom_id: Ccr
                }, function() {
                    receiveChatroom(Ccr);
                });
                toggleChatroomUserInfo(data.id);
            });
            a("#chat_chatroom_remove_mod_" + data.id).click(function() {
                a.post(c_ac_path + "includes/json/send/send_settings.php", {
                    chatroom_remove_mod: data.id,
                    chatroom_id: Ccr
                }, function() {
                    receiveChatroom(Ccr);
                });
                toggleChatroomUserInfo(data.id);
            });
            a("#chat_chatroom_block_user_" + data.id).click(function() {
                a.post(c_ac_path + "includes/json/send/send_settings.php", {
                    block_chat: data.id
                }, function(json_data) {
                    if (json_data != "-1") {
                        if (typeof blockList[data.id] == "undefined") {
                            blockList[data.id] = data.id;
                        }
                        loadBuddyList();
                        displayMessage("chat_chatroom_message_flyout", lang[103], "notice");
                    }
                });
                toggleChatroomUserInfo(data.id);
            });
            if (c_enable_moderation != 1) {
                a("#chat_chatroom_report_user_" + data.id).hide();
            }
            a("#chat_chatroom_report_user_" + data.id).click(function() {
                a.post(c_ac_path + "includes/json/send/send_settings.php", {
                    report_about: data.id,
                    report_from: u_id,
                    report_chatroom: Ccr
                }, function(json_data) {
                    displayMessage("chat_chatroom_message_flyout", lang[168], "notice");
                });
                toggleChatroomUserInfo(data.id);
            });
            a("#chat_chatroom_ban_user_" + data.id).click(function() {
                var ban_length = prompt(lang[57]);
                if (ban_length != null && ban_length != "" && !isNaN(ban_length)) {
                    a.post(c_ac_path + "includes/json/send/send_settings.php", {
                        chatroom_ban: data.id,
                        chatroom_id: Ccr,
                        chatroom_ban_length: ban_length
                    }, function() {
                        receiveChatroom(Ccr);
                    });
                }
                toggleChatroomUserInfo(data.id);
            });
            a("#chat_chatroom_silence_user_" + data.id).click(function() {
                var silence_length = prompt(lang[162]);
                if (silence_length != null && silence_length != "" && !isNaN(silence_length)) {
                    a.post(c_ac_path + "includes/json/send/send_settings.php", {
                        chatroom_silence: data.id,
                        chatroom_id: Ccr,
                        chatroom_silence_length: silence_length
                    }, function() {});
                }
                toggleChatroomUserInfo(data.id);
            });
            a("#chat_chatroom_private_message_" + data.id).click(function() {
                if (data.b != 1 || is_admin == 1) {
                    if (u_id != data.id) {
                        jqac.chat.chatWith(data.id);
                    }
                } else {
                    displayMessage("chat_chatroom_message_flyout", lang[46], "error");
                }
                toggleChatroomUserInfo(data.id);
            });
            a("#chat_chatroom_user_" + data.id).click(function() {
                if (crou != data.id) {
                    a("#chat_chatroom_user_" + crou).removeClass("chat_chatroom_clicked");
                    a("#chat_chatroom_users_flyout_" + crou).removeClass("chat_chatroom_create_flyout_display");
                }
                crou = data.id;
                toggleChatroomUserInfo(data.id);
                a("#chat_chatroom_users_flyout_" + data.id).css("top", a("#chat_chatroom_user_" + crou).position().top - a("#chat_chatroom_users_flyout_" + data.id).height() + a("#chat_chatroom_user_" + crou).height() + 12 + "px");
            }).children("#chat_chatroom_users_flyout_" + data.id).click(function(e) {
                if (a(e.target).is("a")) {
                    window.location = data.l;
                } else {
                    return false;
                }
            });
        }

        function toggleChatroomUserInfo(id) {
            a("#chat_chatroom_user_" + id).toggleClass("chat_chatroom_clicked");
            a("#chat_chatroom_users_flyout_" + id).toggleClass("chat_chatroom_create_flyout_display");
        }

        function loadBuddyList() {
            clearTimeout(Z);
            a.ajax({
                url: c_ac_path + "includes/json/receive/receive_buddylist.php",
                cache: false,
                type: "get",
                dataType: "json",
                success: function(b) {
                    buildBuddyList(b);
                    if (c_disable_avatars == 1) {
                        a(".chat_userlist_avatar").addClass("chat_hide_avatars");
                    }
                    adjustBuddyListSize();
                    adjustBarSize();
                }
            });
            if (typeof c_list_heart_beat != "undefined") {
                var BLHT = c_list_heart_beat * 1000;
            } else {
                var BLHT = 60000;
            }
            Z = setTimeout(function() {
                loadBuddyList();
            }, BLHT);
        }

        function buildBuddyList(b) {
            V.timestamp = ma;
            var c = {},
                d = "";
            c.available = "";
            c.busy = "";
            c.offline = "";
            c.invisible = "";
            c.away = "";
            onlineNumber = buddylistreceived = 0;
            b && a.each(b, function(i, e) {
                if (i == "buddylist") {
                    buddylistreceived = 1;
                    totalFriendsNumber = onlineNumber = 0;
                    a.each(e, function(l, f) {
                        longname = renderHTMLString(f.n).length > 16 ? renderHTMLString(f.n).substr(0, 16) + "..." : f.n;
                        if (G[f.id] != null) {
                            a(".chat_closebox_bottom_status", $users[f.id]).removeClass("chat_available").removeClass("chat_busy").removeClass("chat_offline").removeClass("chat_away").addClass("chat_" + f.s);
                            $users[f.id].removeClass("chat_tab_offline").removeClass("chat_away").addClass("chat_tab_" + f.s);
                            $user_popups[f.id].length > 0 && a(".chat_tabsubtitle .chat_message", $user_popups[f.id]).html(f.m);
                            if (f.s == "offline" || f.s == "busy") {
                                a(".chat_tabtitle .chat_video_icon", $user_popups[f.id]).addClass("chat_video_unavailable");
                            } else {
                                a(".chat_tabtitle .chat_video_icon", $user_popups[f.id]).removeClass("chat_video_unavailable");
                            }
                        }
                        if (f.s == "available" || f.s == "away" || f.s == "busy") {
                            onlineNumber++;
                        }
                        totalFriendsNumber++;
                        if (a("#chat_setting_names_only :input").is(":checked")) {
                            d = "chat_hide_avatars";
                        }
                        c[f.s] += "<div id=\"chat_userlist_" + f.id + "\" class=\"chat_userlist chat_buddylist_admin_" + f.admin + "\" onmouseover=\"jqac(this).addClass('chat_userlist_hover');\" onmouseout=\"jqac(this).removeClass('chat_userlist_hover');\"><img class=\"chat_userlist_avatar " + d + "\" src=\"" + f.a + "\" /><span class=\"chat_userscontentname\">" + longname + "</span><span class=\"chat_userscontentdot chat_" + f.s + "\"></span></div>";
                        uc_status[f.id] = f.s;
                        uc_name[f.id] = f.n;
                        uc_avatar[f.id] = f.a;
                        uc_link[f.id] = f.l;
                    });
                }
                if (buddylistreceived == 1 && bli == 0) {
                    for (buddystatus in c) {
                        if (c.hasOwnProperty(buddystatus)) {
                            if (c[buddystatus] == "") {
                                a("#chat_userslist_" + buddystatus).html("");
                            } else {
                                a("#chat_userslist_" + buddystatus).html("<div>" + c[buddystatus] + "</div>");
                            }
                        }
                    }
                    a(".chat_userlist").click(function(l) {
                        if (!a(this).hasClass("chat_jabber_user")) {
                            receiveUserFromUserlist(l.target);
                        }
                    });
                    a("#chat_userstab_text").html("<b>" + lang[4] + "</b> (<b>" + onlineNumber + "</b>)");
                    R = onlineNumber;
                    totalFriendsNumber == 0 && a("#chat_userslist_available").html("<div class=\"chat_nofriends\">" + lang[8] + "</div>");
                    R == 0 && a("#chat_userslist_available").html("<div class=\"chat_nofriends\">" + lang[8] + "</div>");
                    R >= c_search_min ? a("#chat_search_friends").show() : a("#chat_search_friends").hide();
                    buddylistreceived = 0;
                } else {
                    a("#chat_userstab_text").html("<b>" + lang[4] + "</b> (<b>" + onlineNumber + "</b>)");
                }
                a(".chat_buddylist_admin_1").css("background-color", "#" + c_admin_bg);
                a(".chat_buddylist_admin_1").css("color", "#" + c_admin_txt);
            });
        }

        function cancelJSONP() {
            if (typeof CHA != "undefined") {
                clearTimeout(CHA);
            }
            if (typeof xOptions != "undefined") {
                xOptions.abort();
            }
        }

        function receiveCore() {
            cancelJSONP();
            var url = c_ac_path + "includes/json/receive/receive_core.php?hash=" + u_hash_id + "&init=" + acsi + "&room=" + Ccr;
            xOptions = a.ajax({
                url: url,
                dataType: "jsonp",
                success: function(b) {
                    V.timestamp = ma;
                    var c = "",
                        d = {};
                    d.available = "";
                    d.busy = "";
                    d.offline = "";
                    d.away = "";
                    onlineNumber = buddylistreceived = 0;
                    if (b && b != null) {
                        var i = 0;
                        a.each(b, function(e, l) {
                            if (e == "typing") {
                                a.each(l, function(f, h) {
                                    if (h.is_typing == "1") {
                                        receiveTyping(h.typing_id);
                                    } else {
                                        receiveNotTyping(h.typing_id);
                                    }
                                });
                            }
                            if (e == "announcements") {
                                a.each(l, function(f, h) {
                                    receiveAnnouncement(h);
                                });
                            }
                            if (e == "warnings") {
                                a.each(l, function(f, h) {
                                    receiveWarning(h);
                                });
                            }
                            if (e == "chatroom") {
                                var d1 = 0,
                                    d2 = "";
                                a.each(l, function(f, h) {
                                    if (h.action == 1) {
                                        a("#chat_chatroom_message_" + h.m + " .chat_chatroom_msg").html(lang[159] + h.n);
                                    } else {
                                        if (typeof blockList[h.userid] == "undefined") {
                                            addChatroomMessage(h.id, h.n, h.m, h.userid, h.t, h.global, h.mod, h.admin);
                                        }
                                        d2 = h;
                                        d1++;
                                    }
                                });
                                if (typeof d2 != "undefined" && d1 > 0) {
                                    if (typeof blockList[d2.userid] == "undefined") {
                                        showChatroomTime();
                                        chatroomAlerts(d1);
                                        if (d2.userid != u_id) {
                                            u_chatroom_sound == 1 && !a(".chat_chatroom_message_input").is(":focus") && playNewMessageSound();
                                        }
                                    }
                                }
                            }
                            if (e == "notifications") {
                                var markup2 = "";
                                a.each(l, function(f, h) {
                                    addNotification(h.alert_id, h.markup);
                                    markup2 = h.markup;
                                });
                                notificationAlerts(markup2);
                            }
                            if (e == "messages") {
                                var play_sound = 0;
                                a.each(l, function(f, h) {
                                    receiveMessage(h.id, h.from, h.message, h.sent, h.self, h.old);
                                    if (!a(".chat_textarea", $user_popups[h.from]).is(":focus")) {
                                        play_sound = 1;
                                    }
                                });
                                K = 1;
                                D = E;
                                j != "" && i > 0 && addMessageToContent(j, c);
                                showTimeAndTooltip();
                                d != 1 && u_sounds == 1 && play_sound == 1 && acsi != 1 && playNewMessageSound();
                            }
                        });
                    }
                    set("initialize", "0");
                    set("currenttime", "0");
                    if ($ != 1 && w != 1) {
                        K++;
                        if (K > 4) {
                            D *= 2;
                            K = 1;
                        }
                        if (D > 12000) {
                            D = 12000;
                        }
                    }
                    acsi++;
                }
            });
            if (isAway == 1) {
                var CHT = c_heart_beat * 1000 * 3;
            } else {
                var CHT = c_heart_beat * 1000;
            }
            if (c_push_engine != 1) {
                CHA = setTimeout(function() {
                    receiveCore();
                }, CHT);
            }
        }

        function addChatroomMessage(id, name, message, userid, sent, global, mod, admin) {
            if (userid == u_id) {
                uc_avatar[u_id] = u_avatar;
            }
            message = stripslashes(message);
            message = replaceURLWithHTMLLinks(message);
            var sent_time = new Date(sent * 1000);
            if (typeof uc_avatar[userid] == "undefined") {
                a.ajax({
                    url: c_ac_path + "includes/json/receive/receive_user.php",
                    data: {
                        userid: userid
                    },
                    type: "post",
                    cache: false,
                    dataType: "json",
                    success: function(data) {
                        if (data) {
                            uc_avatar[userid] = data.a;
                            chatroomDiv(id, uc_avatar[userid], name, sent_time, message, global, mod, admin, userid);
                        }
                    }
                });
            } else {
                chatroomDiv(id, uc_avatar[userid], name, sent_time, message, global, mod, admin, userid);
            }
            count++;
        }

        function chatroomDiv(id, image, name, time, message, global, mod, admin, userid) {
            var container = $chatroom_chat[0].scrollHeight - $chatroom_chat.scrollTop() - 10;
            var container2 = $chatroom_chat.outerHeight();
            var title = "",
                l = "",
                important = "";
            if (userid == u_id) {
                l = "chat_self";
            }
            if (mod == 1) {
                title = lang[137];
                important = "chat_chatroom_important";
            }
            if (admin == 1) {
                title = lang[136];
                important = "chat_chatroom_important";
            }
            if (a("#chat_chatroom_message_" + id).length > 0) {
                a("#chat_chatroom_message_" + id + " .chat_chatroom_msg").html(message);
                if (userid == u_id) {
                    a("#chat_chatroom_message_" + id).addClass(l);
                }
            } else {
                if (global == 1) {
                    a("<div/>").attr("id", "chat_chatroom_message_" + id).addClass("chat_chatroom_box_message").addClass("chat_clearfix").html("<div class=\"chat_chatroom_message_content chat_global_chatroom_message\">" + formatTimestamp(time) + message + "</div>").appendTo($chatroom_chat);
                    receiveChatroom(Ccr);
                } else {
                    a("<div/>").attr("id", "chat_chatroom_message_" + id).addClass(important).addClass(l).addClass("chat_chatroom_box_message").addClass("chat_clearfix").html("<img class=\"chat_chatroom_message_avatar chat_no_names\" src=\"" + image + "\" alt=\"" + name + title + "\" /><div class=\"chat_chatroom_message_name\">" + name + title + ":</div><div class=\"chat_chatroom_message_content\"><div class=\"chat_chatroom_delete\" data-id=\"" + id + "\"> </div>" + formatTimestamp(time) + "<span class=\"chat_chatroom_msg\">" + message + "</span></div>").appendTo($chatroom_chat);
                }
                if (c_disable_avatars == 1 || a("#chat_setting_names_only :input").is(":checked")) {
                    a(".chat_chatroom_avatar").addClass("chat_hide_avatars");
                    a(".chat_chatroom_message_avatar").addClass("chat_hide_avatars");
                    a(".chat_chatroom_flyout_avatar").addClass("chat_hide_avatars");
                    a(".chat_chatroom_message_name").show();
                    a(".chat_chatroom_message_avatar").removeClass("chat_no_names");
                }
                if (a("#chat_chatroom_show_names :input").is(":checked")) {
                    a(".chat_chatroom_message_name").show();
                    a(".chat_chatroom_message_avatar").removeClass("chat_no_names");
                }
                if (container <= container2) {
                    $chatroom_chat.scrollTop(50000);
                    a(".chat_image_message img").one("load", function() {
                        setTimeout(function() {
                            $chatroom_chat.scrollTop(50000);
                        }, 500);
                    }).each(function() {
                        if (this.complete) {
                            a(this).load();
                        }
                    });
                } else {
                    displayMessage("chat_chatroom_message_flyout", lang[134], "notice");
                }
                showChatroomTime();
                modDeleteControls();
            }
        }

        function chatroomAlerts(count) {
            if (a("#chat_chatrooms_button .chat_tabalert").length > 0 && count > 0) {
                var count2 = parseInt(a("#chat_chatrooms_button .chat_tabalert").html()) + count;
                a("#chat_chatrooms_button .chat_tabalert").html(count2);
                if (bounce2 == 1) {
                    bounce2 = 0;
                    a("#chat_chatrooms_button .chat_tabalert").stop(true, true).effect("bounce", {
                        times: 3,
                        distance: 5
                    }, 200, function() {
                        bounce2 = 1;
                    });
                }
            } else if (!$chatrooms_button.hasClass("chat_tabclick")) {
                $chatrooms_button.addClass("chat_tab_new_message");
                a("<div/>").css("top", "-11px").css("left", c_width_chatroom - 10 + "px").addClass("chat_tabalert").html(count).appendTo($chatrooms_button);
            }
        }

        function receiveAnnouncement(h) {
            if (h.read == 0 && h.data != "") {
                a("#chat_announcement").remove();
                $body.append(chat.Templates.announcements_display(h));
                if (a("#chat_warnings").length) {
                    var nb = parseInt(a(window).height() - a("#chat_warnings").position().top);
                    a("#chat_announcement").css("bottom", nb + 5 + "px");
                }
                a("#chat_announcement .chat_announce_close").click(function() {
                    a("#chat_announcement").remove();
                    if (a("#chat_warnings").length) {
                        a("#chat_warnings").css("bottom", "35px");
                    }
                    a.post(c_ac_path + "includes/json/send/send_settings.php", {
                        announce: 1
                    }, function() {});
                });
            } else {
                a("#chat_announcement").remove();
            }
        }

        function addNotification(alert_id, markup) {
            a("<div/>").attr("id", "chat_alert_" + alert_id).attr("class", "chat_notification_message_div").html(markup).appendTo(a("#chat_notifications_content"));
            Q++;
        }

        function notificationAlerts(markup) {
            a("#chat_optionsbutton .chat_tabalertnf").remove();
            if (!$optionsbutton.hasClass("chat_tabclick")) {
                if (a("#chat_notification_alert").length > 0) {
                    a("#chat_notification_alert").remove();
                }
                $body.append("<div id=\"chat_notification_alert\"><div class=\"chat_notification_alert_content\">" + markup + "</div><div class=\"chat_notification_tip_pos\"></div></div>");
                a("#chat_notification_alert").css("right", "auto").css("left", a("#chat_optionsbutton").offset().left - a("#chat_notification_alert").outerWidth() + a("#chat_optionsbutton").outerWidth() / 2 + 18);
                a("#chat_notification_alert .chat_notifications_divider").hide();
                setTimeout(function() {
                    a("#chat_notification_alert").fadeOut("slow", function() {
                        a("#chat_notification_alert").remove();
                    });
                }, 7000);
                $optionsbutton.addClass("chat_tab_new_message");
                a("<div/>").css("top", "-10px").css("left", "8px").addClass("chat_tabalertnf").html(Q).prependTo($optionsbutton);
            }
            if (Q > 0) {
                a("#chat_no_new_notifications").css("display", "none");
            }
        }

        function stripslashes(str) {
            str = str.replace(/\\'/g, "'");
            str = str.replace(/\\"/g, "\"");
            str = str.replace(/\\0/g, "\x00");
            str = str.replace(/\\\\/g, "\\");
            return str;
        }

        function receiveMessage(id, from, message, sent, self, old) {
            ma = id;
            clearTimeout(dtit3);
            DTitChange(uc_name[from]);
            if (j == from && uc_name[from] != "" && uc_name[from] != null) {
                var container = a("#chat_tabcontenttext_" + from)[0].scrollHeight - a("#chat_tabcontenttext_" + from).scrollTop() - 10;
                var container2 = a("#chat_tabcontenttext_" + from).outerHeight();
                var o = uc_name[from];
                if (uc_status[from] == "offline") {
                    loadBuddyList();
                }
                f = "";
                if (self == 1) {
                    fromname = u_name;
                    fromid = u_id;
                    f = " chat_self";
                    avatar = u_avatar;
                    tooltip = lang[90];
                } else {
                    DTitChange(uc_name[from]);
                    fromname = o;
                    fromid = from;
                    avatar = uc_avatar[from];
                    tooltip = fromname;
                }
                var full_name = fromid;
                message = stripslashes(message);
                message = replaceURLWithHTMLLinks(message);
                if (a("#chat_message_" + id).length > 0) {
                    a("#chat_message_" + id + " .chat_chatboxmessagecontent").html(message);
                } else {
                    if (c_show_full_name != 1) {
                        if (fromname.indexOf(" ") != -1) {
                            fromname = fromname.slice(0, fromname.indexOf(" "));
                        }
                    }
                    a(".chat_tabcontenttext", $user_popups[from]).append("<div class=\"chat_chatboxmessage chat_clearfix" + f + "\" id=\"chat_message_" + id + "\" style=\"display:none\">" + formatTimestamp(new Date(sent * 1000)) + "<div class=\"chat_chatboxmessagefrom\"><div class=\"chat_disable_avatars_name\">" + fromname + "</div><img alt=\"" + tooltip + "\" class=\"chat_chatbox_avatar\" src=\"" + avatar + "\" /></div><div class=\"chat_chatboxmessage_wrapper\"><div class=\"chat_chatboxmessagecontent\">" + message + "</div></div></div>");
                    if (c_chat_animations == 1 && old != 1) {
                        if (f == " chat_self") {
                            a("#chat_message_" + id).show("slide", {
                                direction: "right"
                            });
                        } else {
                            a("#chat_message_" + id).show("slide", {
                                direction: "left"
                            });
                        }
                    } else {
                        a("#chat_message_" + id).show();
                    }
                    last_sent[from] = sent;
                    last_name[from] = full_name;
                    last_id[from] = id;
                    if (c_disable_avatars == 1 || a("#chat_setting_names_only :input").is(":checked")) {
                        setAvatarVisibility(1);
                    }
                }
                if (container <= container2 || !$users[from].hasClass("chat_tabclick")) {
                    a("#chat_tabcontenttext_" + from).scrollTop(50000);
                    a(".chat_image_message img").one("load", function() {
                        setTimeout(function() {
                            a("#chat_tabcontenttext_" + from).scrollTop(50000);
                        }, 500);
                    }).each(function() {
                        if (this.complete) {
                            a(this).load();
                        }
                    });
                } else {
                    displayMessage("chat_chatbox_message_flyout_" + from, lang[134], "notice");
                }
                self != 1 && old != 1 && showDesktopNotification(from, message, id);
            } else {
                message = stripslashes(message);
                addMessageToChatbox(from, message, self, old, id, 0, sent);
                j == "" && 0 && activateUser(from);
            }
        }

        function receiveTyping(id) {
            if (typeof $users[id] != "undefined") {
                a(".chat_closebox_bottom_status", $users[id]).addClass("chat_typing");
            }
        }

        function receiveNotTyping(id) {
            if (typeof $users[id] != "undefined") {
                a(".chat_closebox_bottom_status", $users[id]).removeClass("chat_typing");
            }
        }

        function pushCancelAll() {
            if (c_push_engine == 1) {
                push.unsubscribe({
                    channel: "u" + u_id
                });
                push.unsubscribe({
                    channel: "chat"
                });
                if (Ccr > 0) {
                    push.unsubscribe({
                        channel: "chatroom" + Ccr
                    });
                }
            }
        }

        function pushSubscribe() {
            if (c_push_engine == 1) {
                push.subscribe({
                    channel: "u" + u_id,
                    callback: function(data) {
                        pushReceive(data);
                    }
                });
                push.subscribe({
                    channel: "chat",
                    callback: function(data) {
                        pushReceive(data);
                    }
                });
            }
        }

        function pushReceive(data) {
            if ("announcement" in data) {
                receiveAnnouncement(data.announcement);
            }
            if ("warning" in data) {
                receiveWarning(data.warning);
            }
            if ("notification" in data) {
                var markup2;
                addNotification(data.notification.alert_id, data.notification.markup);
                notificationAlerts(markup2);
            }
            if ("chatroommessage" in data) {
                if (typeof blockList[data.chatroommessage.userid] == "undefined") {
                    addChatroomMessage(data.chatroommessage.id, data.chatroommessage.name, data.chatroommessage.message, data.chatroommessage.userid, data.chatroommessage.sent, data.chatroommessage.global, data.chatroommessage.mod, data.chatroommessage.admin);
                    if (data.chatroommessage.name != "Delete" && data.chatroommessage.global != 1) {
                        chatroomAlerts(1);
                        if (data.chatroommessage.userid != u_id) {
                            u_chatroom_sound == 1 && !a(".chat_chatroom_message_input").is(":focus") && playNewMessageSound();
                        }
                    }
                }
            }
            if ("typing" in data) {
                receiveTyping(data.typing.id);
            }
            if ("nottyping" in data) {
                receiveNotTyping(data.nottyping.id);
            }
            if ("messages" in data) {
                receiveMessage(data.messages.id, data.messages.from, data.messages.message, data.messages.sent, data.messages.self, data.messages.old);
                data.messages.self != 1 && u_sounds == 1 && !a(".chat_textarea", $user_popups[data.messages.from]).is(":focus") && playNewMessageSound();
                showTimeAndTooltip();
                K = 1;
                D = E;
            }
            if ("chatroomban" in data) {
                Ccr = 0;
                chatroomreceived = 0;
                loadChatroomList();
                displayMessage("chat_chatroom_message_flyout", data.error2, "error");
            }
        }

        function DTitChange(name) {
            name = renderHTMLString(name);
            if (dtit2 != 2) {
                document.title = lang[30] + " " + name + "!";
                dtit2 = 2;
            } else {
                document.title = dtit;
                dtit2 = 1;
            }
            if (window_focus == false) {
                dtit3 = setTimeout(function() {
                    DTitChange(name);
                }, 1000);
            } else {
                document.title = dtit;
                clearTimeout(dtit3);
            }
        }

        function changePushChannel(name, connect) {
            if (connect == 1) {
                push.subscribe({
                    channel: name,
                    callback: function(data) {
                        pushReceive(data);
                    }
                });
            } else {
                push.unsubscribe({
                    channel: name
                });
            }
        }

        function buildTrayButtons() {
            for (var b = "", c = "", arcb = "", d = 0; d < barLinks.length; d++) {
                var i = barLinks[d];
                if (i[6] == "" || i[6] == 0) {
                    i[6] = 16;
                }
                if (d == barLinks.length - 1) {
                    arcb = " chat_right_border";
                }
                b += "<div id=\"chat_trayicon_" + d + "\" class=\"chat_tray_button chat_bar_left" + arcb + "\" style=\"width:" + i[6] + "px;\"><div class=\"chat_inner_button\"><img class=\"chat_tray_icon\" src=" + c_ac_path + "themes/" + u_theme + "/images/icons/" + i[0] + "><div class=\"chat_tray_name\">" + i[7] + "</div></div></div>";
                if (i[3] == "_popup") {
                    c += "<div id=\"chat_trayicon_" + d + "_popup\" class=\"chat_traypopup\" style=\"display:none\"><div class=\"chat_traytitle\"><div class=\"chat_name\">" + i[1] + "</div><div class=\"chat_minimizebox\"></div><br clear=\"all\"/></div><div class=\"chat_traycontent\"><div class=\"chat_traycontenttext\"><iframe allowtransparency=\"true\" frameborder=0 width=\"" + i[4] + "\" height=\"" + i[5] + "\" id=\"chat_trayicon_" + d + "_iframe\"  ></iframe></div></div></div>";
                }
            }
            $base.append("<div>" + b + "</div>");
            $body.append("<div>" + c + "</div>");
            a(".chat_tray_button").mouseover(function() {
                var e = a(this).attr("id").substr(14);
                if (barLinks[e][6] <= 16 || barLinks[e][6] == "") {
                    showTooltip(a("#chat_trayicon_" + e), barLinks[e][1], 1);
                }
                a(this).addClass("chat_tabmouseover");
            });
            a(".chat_tray_button").mouseout(function() {
                a(this).removeClass("chat_tabmouseover");
                hideTooltip();
            });
            a(".chat_traytitle").mouseenter(function() {
                var e = a(this).parent().attr("id");
                e = e.substring(19, e.length - 6);
                a(this).addClass("chat_chatboxtabtitlemouseover");
            });
            a(".chat_traytitle").mouseleave(function() {
                var e = a(this).parent().attr("id");
                e = e.substring(19, e.length - 6);
                a(this).removeClass("chat_chatboxtabtitlemouseover");
            });
            a(".chat_traytitle").click(function() {
                var e = a(this).parent().attr("id");
                e = e.substring(19, e.length - 6);
                a("#chat_trayicon_" + e).click();
            });
            a(".chat_tray_button").click(function() {
                var e = a(this).attr("id").substr(14);
                if (j != "") {
                    closePopup($user_popups[j], $users[j]);
                    a(".chat_closebox_bottom", $users[j]).removeClass("chat_closebox_bottom_click");
                    j = "";
                }
                closePopup($userstab_popup, $buddy_list_tab);
                closePopup($optionsbutton_popup, $optionsbutton);
                closePopup($modbutton_popup, $modbutton);
                var l = "_self";
                if (barLinks[e][3]) {
                    l = barLinks[e][3];
                }
                if (l == "_popup") {
                    if (m != e) {
                        closePopup(a("#chat_trayicon_" + m + "_popup"), a("#chat_trayicon_" + m));
                        m = "";
                    }
                    if (m == "") {
                        a("#chat_trayicon_" + e + "_popup").css("left", a("#chat_trayicon_" + e).offset().left).css("bottom", "25px").css("width", barLinks[e][4]);
                        a("#chat_trayicon_" + e + "_popup").addClass("chat_tabopen");
                        a("#chat_trayicon_" + e).addClass("chat_trayclick");
                        if (a("#chat_trayicon_" + e + "_iframe").attr("src") === undefined || a("#chat_trayicon_" + e + "_iframe").attr("src") == "") {
                            a("#chat_trayicon_" + e + "_iframe").attr("src", barLinks[e][2]);
                        }
                        m = e;
                    } else {
                        closePopup(a("#chat_trayicon_" + m + "_popup"), a("#chat_trayicon_" + m));
                        m = "";
                    }
                } else {
                    var bar_link_url = barLinks[e][2].replace("{USER_ID}", u_id);
                    bar_link_url = bar_link_url.replace("{USER_NAME}", u_name);
                    window.open(bar_link_url, l);
                }
            });
        }

        function buildChatboxes() {
            $chatbox_left.click(function() {
                if ($chatboxes.scrollLeft() == 0) {} else {
                    scrollChatboxes("-=148px");
                }
            });
            $chatbox_right.click(function() {
                if ($chatboxes.scrollLeft() + $chatboxes.width() == $chatboxes_wide.width()) {} else {
                    scrollChatboxes("+=148px");
                }
            });
        }

        function notificationPermission() {
            if (window.webkitNotifications && window.webkitNotifications.checkPermission) {
                window.webkitNotifications.requestPermission();
            } else if (window.Notification && window.Notification.requestPermission) {
                window.Notification.requestPermission();
            } else {
                return;
            }
        }

        function showDesktopNotification(id, message, message_id) {
            var s_message = message.replace(/<(?:.|\n)*?>/gm, "").replace(/&amp;/g, "&").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, "\"");
            if (s_message != "") {
                if (window.Notification && !window_focus && c_desktop_notify == 1) {
                    var time = (new Date).getTime();
                    var notification = new window.Notification(lang[144] + renderHTMLString(uc_name[id]), {
                        icon: uc_avatar[id],
                        body: s_message,
                        tag: message_id
                    });
                    setTimeout(function() {
                        notification.close();
                    }, 5000);
                }
            }
        }

        function lsClick(id, action, acvar) {
            if (lsreceive == 0) {
                var milliseconds = (new Date).getTime();
                if (action == "ac_openclose") {
                    if (typeof acvar == "undefined") {
                        if (a(id).hasClass("chat_tabclick")) {
                            localStorage.setItem("ac_close", id + "/" + milliseconds);
                        } else {
                            localStorage.setItem("ac_open", id + "/" + milliseconds);
                        }
                    } else {
                        eval("var temp=$" + acvar + ";");
                        if (id == " ") {
                            if (temp.hasClass("chat_tabclick")) {
                                localStorage.setItem("ac_close", id + "," + acvar + "/" + milliseconds);
                            } else {
                                localStorage.setItem("ac_open", id + "," + acvar + "/" + milliseconds);
                            }
                        } else {
                            if (a(id, acvar).hasClass("chat_tabclick")) {
                                localStorage.setItem("ac_close", id + "," + acvar + "/" + milliseconds);
                            } else {
                                localStorage.setItem("ac_open", id + "," + acvar + "/" + milliseconds);
                            }
                        }
                    }
                } else {
                    if (!msieversion()) {
                        if (typeof acvar == "undefined") {
                            localStorage.setItem(action, id + "/" + milliseconds);
                        } else {
                            localStorage.setItem(action, id + "," + acvar + "/" + milliseconds);
                        }
                    }
                }
            }
        }

        function msieversion() {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");
            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                return true;
            }
            return false;
        }

        function localStorageFired(e) {
            lsreceive = 1;
            if (e.key == "ac_open" || e.key == "ac_close" || e.key == "ac_click") {
                var res = e.newValue.split("/");
                var res2 = res[0].split(",");
                if (typeof res2[1] == "undefined") {
                    if (e.key == "ac_click") {
                        a(res2[0]).click();
                    } else if (!a(res2[0]).hasClass("chat_tabclick") && e.key == "ac_open") {
                        a(res2[0]).click();
                    } else if (a(res2[0]).hasClass("chat_tabclick") && e.key == "ac_close") {
                        a(res2[0]).click();
                    }
                } else {
                    eval("var temp=$" + res2[1] + ";");
                    if (res2[0] == " ") {
                        if (typeof temp != "undefined" && e.key == "ac_click") {
                            temp.click();
                        } else if (typeof temp != "undefined" && !temp.hasClass("chat_tabclick") && e.key == "ac_open") {
                            temp.click();
                        } else if (typeof temp != "undefined" && temp.hasClass("chat_tabclick") && e.key == "ac_close") {
                            temp.click();
                        }
                    } else {
                        if (a(res2[0], temp).length && e.key == "ac_click") {
                            a(res2[0], temp).click();
                        } else if (a(res2[0], temp).length && !a(res2[0], temp).hasClass("chat_tabclick") && e.key == "ac_open") {
                            a(res2[0], temp).click();
                        } else if (a(res2[0], temp).length && a(res2[0], temp).hasClass("chat_tabclick") && e.key == "ac_close") {
                            a(res2[0], temp).click();
                        }
                    }
                }
            }
            lsreceive = 0;
        }

        function runchat() {
            $base = a("<div/>").attr("id", "chat_base").appendTo($body);
            window.addEventListener("storage", localStorageFired, false);
            if (c_chat_maintenance != 0 || c_guests_login_msg != 0 && u_id == "") {
                buildMaintenance();
            } else {
                if (c_hide_bar_on != 0) {
                    buildShowBarButton();
                    buildHideBarButton();
                }
                buildPopoutChatButton();
                u_is_mod == 1 && c_enable_moderation == 1 && buildModButton();
                c_notifications != 0 && buildOptionsButton();
                c_chatrooms != 0 && buildChatroomsButton();
                buildBuddyListTab();
            }
            c_online_list == 0 && a("#chat_buddy_list_tab").hide();
            if (c_links_right != 1) {
                buildTrayButtons();
            }
            if (c_applications_on != 0) {
                if (u_id == "" && c_guests_apps == "1" || u_id != "" && u_is_guest != 1 || u_id != "" && u_is_guest == 1 && c_guests_apps == 1) {
                    if (c_no_apps_menu != 1) {
                        buildApplicationsButton();
                    }
                    buildApplicationButtons();
                }
            }
            if (c_links_right == 1) {
                buildTrayButtons();
            }
            $body.append("<div id=\"chat_sound_player_holder\"></div>");
            $chatbox_right = a("<div/>").attr("id", "chat_chatbox_right").appendTo($base);
            a("<span/>").addClass("chat_next_tab").appendTo($chatbox_right);
            a("<div/>").addClass("chat_tabtext").appendTo($chatbox_right);
            a("<span/>").css("top", "-5px").css("display", "none").addClass("chat_tabalertlr").appendTo($chatbox_right);
            $chatboxes = a("<div/>").attr("id", "chat_chatboxes").appendTo($base);
            $chatboxes_wide = a("<div/>").attr("id", "chat_chatboxes_wide").appendTo($chatboxes);
            $chatbox_left = a("<div/>").attr("id", "chat_chatbox_left").appendTo($base);
            a("<span/>").addClass("chat_previous_tab").appendTo($chatbox_left);
            a("<div/>").addClass("chat_tabtext").appendTo($chatbox_left);
            a("<span/>").css("top", "-5px").css("display", "none").addClass("chat_tabalertlr").appendTo($chatbox_left);
            buildChatboxes();
            updateRightLastClasses();
            $chatboxes_wide.css("width", "0px");
            addHover(a("#chat_chatbox_left, #chat_chatbox_right"), "chat_chatbox_lr_mouseover");
            a(window).bind("resize", adjustBarSize);
            set("buddylist", "1");
            set("initialize", "1");
            set("currenttime", ab);
            a(window).focus(function() {
                window_focus = true;
            }).blur(function() {
                window_focus = false;
            });
            if (c_desktop_notify == 1) {
                a("#chat_base").click(notificationPermission);
            }
            if (typeof document.body.style.maxHeight === "undefined") {
                W = true;
                $base.css("position", "absolute");
                $tooltip.css("position", "absolute");
                $userstab_popup.css("position", "absolute");
                $optionsbutton_popup.css("position", "absolute");
                a(window).bind("scroll", function() {
                    positionchat();
                });
            }
            if (c_push_engine == 1) {
                push = PUBNUB.init({
                    publish_key: c_push_publish,
                    subscribe_key: c_push_subscribe
                });
            }
            if (c_chat_maintenance != 1) {
                for (var d = 0; d < unfocus_chat.length; d++) {
                    if (typeof(unfocus_chat[d] != "undefined")) {
                        if (unfocus_chat[d].toString().search("facebook") == "-1") {
                            receiveUser(unfocus_chat[d], uc_name[unfocus_chat[d]], uc_status[unfocus_chat[d]], uc_avatar[unfocus_chat[d]], uc_link[unfocus_chat[d]], "1");
                        }
                    }
                }
            }
            if (u_hide_bar == 1 || u_status == "offline") {
                if (u_status == "offline" && u_hide_bar != 1) {
                    a("#chat_userstab_text").html("Chat (Offline)");
                    $chatboxes.hide();
                    $chatbox_right.hide();
                    $chatbox_left.hide();
                } else {
                    $base.hide();
                    $show_bar_button.css("display", "block");
                }
                w = 1;
                a.idleTimer("destroy");
            } else if (c_chat_maintenance != 1 && u_id != "" && u_popout_time != "1") {
                if (u_chat_open.toString().search("facebook") == "-1") {
                    u_chat_open != 0 && receiveUser(u_chat_open, uc_name[u_chat_open], uc_status[u_chat_open], uc_avatar[u_chat_open], uc_link[u_chat_open]);
                }
                if (c_push_engine == 1) {
                    pushSubscribe();
                }
                receiveCore();
                a("#chat_userslist_available").html("<div class=\"chat_nofriends\"><div class=\"chat_loading_icon\"></div>" + lang[25] + "</div>");
                a(".chat_chatroom_full_content").html("<div class=\"chat_nofriends\"><div class=\"chat_loading_icon\"></div>" + lang[34] + "</div>");
                if (u_blist_open == 1 && c_online_list != 0) {
                    $buddy_list_tab.click();
                } else {
                    loadBuddyList();
                }
                if (u_chatroom_open != -1 && $chatrooms_button !== undefined) {
                    u_chatroom_open == 0 && $chatrooms_button.click();
                    if (u_chatroom_open != 0) {
                        Ccr = u_chatroom_open;
                        chatroomreceived = 1;
                        if (typeof $chatroom_create != "undefined") {
                            $chatroom_create.hide();
                        }
                        closePopup($userstab_popup, $buddy_list_tab);
                        closePopup($optionsbutton_popup, $optionsbutton);
                        closePopup($modbutton_popup, $modbutton);
                        $chatrooms_popup.css("left", $chatrooms_button.offset().left - $chatrooms_popup.outerWidth() + $chatrooms_button.outerWidth()).css("bottom", "25px");
                        $chatrooms_button.toggleClass("chat_tabclick").toggleClass("chat_userstabclick");
                        $chatrooms_popup.toggleClass("chat_tabopen");
                        loadChatroom(u_chatroom_open, crt[u_chatroom_open]);
                    }
                }
                if (u_chatroom_stay > 0) {
                    Ccr = u_chatroom_stay;
                    chatroomreceived = 1;
                    if (typeof $chatroom_create != "undefined") {
                        $chatroom_create.hide();
                    }
                    loadChatroom(u_chatroom_stay, crt[u_chatroom_stay]);
                }
                if (u_chatroom_stay == 0 && u_chatroom_open == -1 && c_chatroom_auto_join != 0) {
                    Ccr = c_chatroom_auto_join;
                    chatroomreceived = 1;
                    if (typeof $chatroom_create != "undefined") {
                        $chatroom_create.hide();
                    }
                    loadChatroom(c_chatroom_auto_join, crt[c_chatroom_auto_join]);
                }
                if (u_apps_open != "" && u_apps_open != "0") {
                    a("#chat_app_link_" + u_apps_open).click();
                }
            } else if (u_popout_time == "1") {
                a.idleTimer("destroy");
                $buddy_list_tab.hide();
                $popout_chat_button.show();
                $chatboxes.hide();
                $chatbox_right.hide();
                $chatbox_left.hide();
            }
            clearUserStatus();
            adjustBarSize();
            a("#chat_userstab_icon").addClass("chat_user_" + u_status + "2");
        }

        function positionchat() {
            $base.css("top", a(window).scrollTop() + a(window).height() - 25);
            $userstab_popup.css("top", parseInt(a(window).height()) - parseInt($userstab_popup.css("bottom")) - parseInt($userstab_popup.height()) + a(window).scrollTop() + "px");
            $optionsbutton_popup.css("top", parseInt(a(window).height()) - parseInt($optionsbutton_popup.css("bottom")) - parseInt($optionsbutton_popup.height()) + a(window).scrollTop() + "px");
            $tooltip.length > 0 && $tooltip.css("top", parseInt(a(window).height()) - parseInt($tooltip.css("bottom")) - parseInt($tooltip.height()) + a(window).scrollTop() + "px");
            if (j != "") {
                $user_popups[j].css("position", "absolute");
                $user_popups[j].css("top", parseInt(a(window).height()) - parseInt($user_popups[j].css("bottom")) - parseInt($user_popups[j].height()) + a(window).scrollTop() + "px");
            }
        }

        function playNewMessageSound() {
            swfobject.embedSWF(c_ac_path + "themes/" + u_theme + "/sounds/new%5Fmessage.player.swf?soundswf=" + c_ac_path + "themes/" + u_theme + "/sounds/new%5Fmessage.swf&autoplay=1&loops=0", "chat_sound_player_holder", "1", "1", "9.0.0");
        }

        function renderHTMLString(string) {
            var new_render = string;
            if (typeof string != "undefined") {
                var render = a("<div/>").attr("id", "chat_render").html(string).appendTo("body");
                new_render = a("#chat_render").html();
                render.remove();
            }
            return new_render;
        }
        var bounce2 = 1,
            bounce3 = 1,
            lsreceive = 0,
            chatroom_mod = 0,
            chatroom_admin = 0,
            count = 0,
            V = {},
            dtit = document.title,
            dtit2 = 1,
            dtit3 = 1,
            window_focus = true,
            xa = {},
            j = "",
            crou = "",
            $ = 0,
            w = 0,
            bli = 1,
            isAway = 0,
            chatroomreceived = 0,
            W = false,
            Y, Z, E = 3000,
            Crref2, Ccr = -1,
            open_report = -1,
            message_timeout, D = E,
            K = 1,
            ma = 0,
            R = 0,
            m = "",
            Ka = 0,
            crt = {},
            crt2 = {},
            y = {},
            G = {},
            aa = {},
            ca = {},
            last_id = {},
            last_sent = {},
            last_name = {},
            history_ids = {},
            room_info = [],
            room_desc = [],
            room_limit_msg = [],
            room_limit_sec = [],
            Aa = new Date,
            Na = Aa.getDate(),
            ab = Math.floor(Aa.getTime() / 1000),
            acsi = 1,
            Q = 0,
            fa = -1,
            acp = "Powered By <a href='http://www.chat.com/' target='_blank'>chat</a>",
            pa = 0,
            B, push, jabberListTimer, facebookResponse, jabber_hash = "",
            session_var = "",
            jabberInitialize = 0,
            jabberInitialize2 = 0,
            jabberMsgTimer, onlineNumber = 0,
            jabberOnlineNumber = 0,
            errorCount = 0,
            N;
        var _ts = "",
            _ts2;
        for (d = 0; d < Themes.length; d++) {
            if (Themes[d][2] == u_theme) {
                _ts2 = "selected";
            } else {
                _ts2 = "";
            }
            _ts = _ts + "<option value=\"" + Themes[d][0] + "\" " + _ts2 + ">" + Themes[d][1] + "</option>";
        }
        a.ajaxSetup({
            scriptCharset: "utf-8",
            cache: false
        });
        a.expr[':'].icontains = function(b, c, d) {
            return (b.textContent || b.innerText || jqac(b).text() || "").toLowerCase().indexOf(d[3].toLowerCase()) >= 0;
        };
        arguments.callee.videoWith = function(b) {
            var win = window.open(c_ac_path + "public/video/?rid=" + b, "audiovideochat", "status=no,toolbar=no,menubar=no,directories=no,resizable=no,location=no,scrollbars=no,width=" + c_video_width + ",height=" + c_video_height + "");
            win.focus();
        };
        arguments.callee.runchat = runchat;
        arguments.callee.chatroom = function(b) {
            if (u_hide_bar == 1) {
                showBar();
            }
            $chatrooms_button.click();
            setTimeout(function() {
                Ccr = b;
                loadChatroom(b, "1");
            }, 400);
            $chatrooms_popup.addClass("chat_tabopen");
            a("#chat_chatrooms_button").addClass("chat_tabclick").addClass("chat_userstabclick");
        };
        arguments.callee.chatWith = function(b) {
            if (u_hide_bar == 1) {
                showBar();
            }
            receiveUser(b, uc_name[b], uc_status[b], uc_avatar[b], uc_link[b]);
        };
        arguments.callee.openCloseApp = function(name) {
            a(".chat_appname_" + name).click();
        };
        arguments.callee.changeAppImage = function(name, image) {
            a(".chat_appname_" + name + " img").attr("src", c_ac_path + image);
        };
        arguments.callee.addAppAlert = function(name, number) {
            if (a(".chat_appname_" + name + " .chat_tabalert").length > 0 && number > 0) {
                a(".chat_appname_" + name + " .chat_tabalert").html(number);
                a(".chat_appname_" + name + " .chat_tabalert").effect("bounce", {
                    times: 3,
                    distance: 5
                }, 200);
            } else if (!a(".chat_appname_" + name).hasClass("chat_trayclick")) {
                a("<div/>").css("top", "-11px").css("left", "6px").addClass("chat_tabalert").html(number).appendTo(".chat_appname_" + name);
            }
        };
        arguments.callee.getUser = function(b, c) {
            a.ajax({
                url: c_ac_path + "includes/json/receive/receive_user.php",
                data: {
                    userid: b
                },
                type: "post",
                cache: false,
                dataType: "json",
                success: function(o) {
                    if (o) {
                        window[c](o);
                    } else {
                        window[c](0);
                    }
                }
            });
        };
        arguments.callee.sendMessage = function(b, c) {
            c != "" && a.post(c_ac_path + "includes/json/send/send_message.php", {
                to: b,
                message: c
            }, function(d) {
                if (d) {
                    if (d == "-1") {
                        displayMessage("chat_chatbox_message_flyout_" + b, lang[102], "error");
                    } else {
                        addMessageToChatbox(b, c, 1, 1, d, 1, 1);
                    }
                    a(".chat_tabcontenttext", $user_popups[b]).scrollTop(a(".chat_tabcontenttext", $user_popups[b])[0].scrollHeight);
                }
                K = 1;
            });
        };
        arguments.callee.getBaseUrl = function() {
            return k;
        };
        arguments.callee.logout = function() {
            clearTimeout(Z);
            clearTimeout(Crref2);
            a.idleTimer("destroy");
            pushCancelAll();
            cancelJSONP();
            c_guests_login_msg = 1;
            u_id = "";
            closePopup($userstab_popup, $buddy_list_tab);
            closePopup($optionsbutton_popup, $optionsbutton);
            closePopup($modbutton_popup, $modbutton);
            closePopup($chatrooms_popup, $chatrooms_button);
            closePopup($applications_button_popup, $applications_button);
            if (m != "") {
                closePopup($application_button_popups[m], $application_buttons[m]);
                m = "";
            }
            if (j != "") {
                closePopup($user_popups[j], $users[j]);
                a(".chat_closebox_bottom", $users[j]).removeClass("chat_closebox_bottom_click");
                j = "";
            }
            a("#chat_chatbox_right").remove();
            a("#chat_chatbox_left").remove();
            a("#chat_chatboxes").remove();
            a("#chat_buddy_list_tab").remove();
            a("#chat_chatrooms_button").remove();
            a("#chat_optionsbutton").remove();
            a("#chat_modbutton").remove();
            a("#chat_hide_bar_button").remove();
            buildMaintenance();
        };
    };
})(jqac);
jqac(document).ready(function() {
    if (u_logged_in != 1 && c_disable_chat != 1) {
        jqac.chat();
        jqac.chat.runchat();
    }
});
