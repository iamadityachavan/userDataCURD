var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.userData = [];
    $scope.saveDataToJson = function() {
        var firstName, lastName, dateOfBirth, mobileNumberList = {},
            emailIdList = {},
            tempData = [],
            userData = {};
        var firstName = $("#inputFirstName").val();
        var lastName = $("#inputLastName").val();
        var dateOfBirth = $("#inputDate").val();
        $(".phone-list .phone-input").each(function(index, element) {
            mobileNumberList[index] = {
                'contactType': $(this).find("#dropdownMenuButton").text(),
                'countryCode': $(this).find("#countryCode").val(),
                'mobileNumber': $(this).find("#mobileNumber").val()
            }
        });
        $(".email-list .email-input").each(function(index, element) {
            emailIdList[index] = $(this).find("input[type='email']").val();
        });
        tempData = {
            'id': $scope.userData.length,
            'fullName': firstName + ' ' + lastName,
            'firstName': firstName,
            'lastName': lastName,
            'dateOfBirth': dateOfBirth,
            'mobileNumberList': mobileNumberList,
            'emailIdList': emailIdList
        };
        if ($("#submitMyForm").is("[data-edit-index]")) {
            var index = $("#submitMyForm").attr("data-edit-index");
            $scope.userData[index] = tempData;
            $("#submitMyForm").removeAttr("data-edit-index")
        } else {
            $scope.userData.push(tempData);
        }
        $('.inputTextField').val('');
        $(".tempDivData").remove();
        $(".contactTypeDivData").text("Personal");
        $(".multipleContactAdded").removeClass("multipleContactAdded");
        $(".multipleEmailAdded").removeClass("multipleEmailAdded");
        $(".card").removeClass("text-white bg-danger");

    }
    $scope.deleteUserData = function(index) {
        $scope.userData.splice(index, 1);
    }
    $scope.editUserData = function(index, event) {
        $(".card").removeClass("text-white bg-danger");
        $(event.target).parents(".card").addClass("text-white bg-danger");
        $("#submitMyForm").attr('data-edit-index', index);
        $("#inputFirstName").val($scope.userData[index].firstName);
        $("#inputLastName").val($scope.userData[index].lastName);
        $("#inputDate").val($scope.userData[index].dateOfBirth);
        $(".contactTypeDivData").text($scope.userData[index].mobileNumberList[0].contactType);
        $("#countryCode").eq(0).val($scope.userData[index].mobileNumberList[0].countryCode);
        $("#mobileNumber").eq(0).val($scope.userData[index].mobileNumberList[0].mobileNumber);
        $("#inputEmailData").val($scope.userData[index].emailIdList[0]);
    }
});
$(function() {
    $(document).ready(function() {
        $(".inputBirthDate").datepicker({
            changeMonth: true,
            changeYear: true
        });
    });

    $(document.body).on('click', '.changeType', function() {
        $(".active").removeClass("active");
        $(this).addClass("active");
        $(this).closest('.phone-input').find('.type-text').text($(this).text());
        $(this).closest('.phone-input').find('.type-input').val($(this).data('type-value'));
    });

    $(document.body).on('click', '.btn-remove-phone', function() {
        $(this).closest('.phone-input').remove();
        $(".phone-list .contact-list-label").each(function(index, element) {
            $(this).text("Number " + (index + 1));
            $(this).parents('.phone-input').attr("mobile-number-index", index);
        });
        if ($(".phone-list .phone-input").length === 1) {
            $(".multipleContactAdded").removeClass("multipleContactAdded");
        }
    });

    $('.btn-add-phone').click(function() {
        var index = $('.phone-input').length;
        $('.phone-list').addClass('multipleContactAdded');
        $('.phone-list').append('' + '<div class="phone-input tempDivData" mobile-number-index=' + index + '><label class="contact-list-label">Number ' + (index + 1) + ':</label><div class="form-row">' +
            '<div class = "col-md-3" >' +
            '<label for="contactType">Type:</label><span class = "input-group-btn" >' +
            '<div class="dropdown">' +
            '<button class="btn btn-info dropdown-toggle type-text" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Personal</button>' +
            '<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
            '<a class="dropdown-item changeType active" href="#">Personal</a><a class="dropdown-item changeType" href="#">Home</a><a class="dropdown-item changeType" href="#">Office</a>' +
            '</div></div></span>' +
            '<input id = "contactType" type = "hidden" class = "type-input" value = "" / >' +
            '</div><div class = "col-md-3" >' +
            '<label for="countryCode">Code:</label>' +
            '<input type = "text" data-toggle = "tooltip" data-placement = "top" title = "Enter Country Code" required class = "form-control" maxlength = "3" id = "countryCode" placeholder = "+91" >' +
            '</div><div class = "col-md-6" >' +
            '<label for="mobileNumber">Number:</label><div class="input-group">' +
            '<input type = "number" required maxlength = "10" class = "form-control" id = "mobileNumber" placeholder = "Enter Mobile Number" oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);" >' +
            '<div class="input-group-append btn-remove-phone"><button class="btn btn-danger" type="button">&times;</button></div></div>' +
            '</div></div></div>'
        );
    });

    $(document.body).on('click', '.btn-remove-email', function() {
        $(this).closest('.email-input').remove();
        $(".email-list .email-input").each(function(index, element) {
            $(this).find(".input-group-text").text("Email " + (index + 1));
            $(this).attr("email-index", index);
        });
        if ($(".email-list .email-input").length === 1) {
            $(".multipleEmailAdded").removeClass("multipleEmailAdded");
        }
    });

    $('.btn-add-email').click(function() {
        var index = $('.email-input').length;
        $('.email-list').addClass('multipleEmailAdded');
        $('.email-list').append('' + '<div class="input-group tempDivData email-input mb-2" email-index=' + index + '>' +
            '<div class="input-group-prepend email-list-label"><span class="input-group-text">Email ' + (index + 1) + '</span></div>' +
            '<input type="email" class="form-control" required aria-describedby="emailHelp" maxlength="30" placeholder="Enter Email Address">' +
            '<div class="input-group-append btn-remove-email"><button class="btn btn-danger" type="button">&times;</button></div>' +
            '</div>'
        );
    });
});