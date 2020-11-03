
var current_color = $('.wizard-card').data('color');
var full_color = true;

var paperbootstrapwizard = (function () {
 
    var alertUser = function (tipo, menssage) {
        if (tipo == 1) {
            $('.alert-dismissible').addClass("alert-success");
        } else {
            $('.alert-dismissible').addClass("alert-danger");
        }

        $("strong").text(menssage);

        $('.alert').show();
    }
    var setaOpcaoSelecionada = function (tipo) {
         
        switch (tipo) {
            case 'Cappuccino':
                $('.choiceCappuccino').addClass('active ');
                $('.choiceMocha').removeClass('active');
                $('.choiceCafeComLeite').removeClass('active');
                $('input:radio[name="Cappuccino"]').attr('checked', true);
                $('input:radio[name="Mocha"]').attr('checked', false);
                $('input:radio[name="CafeComLeite"]').attr('checked', false);

                break;
            case 'Mocha':
                $('.choiceMocha').addClass('active ');
                $('.choiceCappuccino').removeClass('active');
                $('.choiceCafeComLeite').removeClass('active');
                $('input:radio[name="Mocha"]').attr('checked', 'checked');
                $('input:radio[name="Cappuccino"]').attr('checked', false);
                $('input:radio[name="CafeComLeite"]').attr('checked', false);

                break;
            case 'CafeComLeite':
                $('.choiceCafeComLeite').addClass('active ');
                $('.choiceMocha').removeClass('active');
                $('.choiceCappuccino').removeClass('active');
                $('input:radio[name="CafeComLeite"]').attr('checked', 'checked');
                $('input:radio[name="Cappuccino"]').attr('checked', false);
                $('input:radio[name="Mocha"]').attr('checked', false);

                break;
        }
    }

    var inicializador = function () {
         
        $(document).ready(function () {

            $('.wizard-card').bootstrapWizard({
                'tabClass': 'nav nav-pills',
                'nextSelector': '.btn-next',
                'previousSelector': '.btn-previous',

                onNext: function (tab, navigation, index) {

                    let valorSelecionado = $("input:checked").val();
                     
                    if (valorSelecionado != undefined || valorSelecionado != null) {

                        if (parseInt($("#UmCentavo").val()) != 0) {
                            alertUser(2, "A maquina está com problemas para ler moedas de 1 centavos, por favor retrilhas.");
                            return false;
                        } else if (parseInt($("#CincoCentavo").val()) != 0) {
                            alertUser(2, "A maquina está com problemas para ler moedas de 5 centavos, por favor retrilhas.");
                            return false;
                        } else if (parseInt($("#DezCentavo").val()) < 0) {
                            alertUser(2, "Ocorreu um error ao ler o valor das moedas de 10 centavos, por favor verique.");
                            return false;
                        } else if (parseInt($("#VinteCincoCentavo").val()) < 0) {
                            alertUser(2, "Ocorreu um error ao ler o valor das moedas de 25 centavos, por favor verique.");
                            return false;
                        } else if (parseInt($("#CinquentaCentavo").val()) < 0) {
                            alertUser(2, "Ocorreu um error ao ler o valor das moedas de 50 centavos, por favor verique.");
                            return false;
                        } else if (parseInt($("#UmReal").val()) < 0) {
                            alertUser(2, "Ocorreu um error ao ler o valor das moedas de 1 real, por favor verique.");
                            return false;
                        }

                        switch (valorSelecionado) {
                                        case '1':

                                            $(".itensPedido").val($(".pCappuccino").text());
                                            $(".valorTotal").val($(".vCappuccino").text());
                                          
                                        break;
                                    case '2':
                                        $(".itensPedido").val($(".pMocha").text());
                                        $(".valorTotal").val($(".vMocha").text());
                                        break;
                                    case '3':
                                            $(".itensPedido").val($(".pCafeComLeite").text());
                                            $(".valorTotal").val($(".vCafeComLeite").text());
                                        break;
                                    }
                        
                       

                        $('.alert').hide();
                        return true;
                    } else {
                        alertUser(2, "Selecione uma opção de café para prosseguir.");
                        return false;
                    }
                },

                onInit: function (tab, navigation, index) {

                    var $total = navigation.find('li').length;
                    $width = 100 / $total;

                    navigation.find('li').css('width', $width + '%');

                },

                onTabClick: function (tab, navigation, index) {
                    alertUser(2, "Não é permitido esse tipo de ação.");
                    return false

                },

                onTabShow: function (tab, navigation, index) {
                    var $total = navigation.find('li').length;
                    var $current = index + 1;

                    var $wizard = navigation.closest('.wizard-card');

                    // If it's the last tab then hide the last button and show the finish instead
                    if ($current >= $total) {
                        $($wizard).find('.btn-next').hide();
                        $($wizard).find('.btn-finish').show();
                    } else {
                        $($wizard).find('.btn-next').show();
                        $($wizard).find('.btn-finish').hide();
                    }

                    //update progress
                    var move_distance = 100 / $total;
                    move_distance = move_distance * (index) + move_distance / 2;

                    $wizard.find($('.progress-bar')).css({ width: move_distance + '%' });
                   

                    $wizard.find($('.wizard-card .nav-pills li.active a .icon-circle')).addClass('checked');

                }
            });
            
        });
    };

    return {
        Inicializador: inicializador,
        SetaOpcaoSelecionada: setaOpcaoSelecionada
    };
})(paperbootstrapwizard || paperbootstrapwizard);

