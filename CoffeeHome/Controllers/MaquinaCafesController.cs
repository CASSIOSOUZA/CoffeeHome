using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoffeeHome.Models;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeHome.Controllers
{
    public class MaquinaCafesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [AutoValidateAntiforgeryToken]
        public IActionResult Create(MaquinaCafe maquinaCafe)
        {
            string descricao = "";
            double valorCafe = 0.0;
            ViewBag.Messagem = "";

            switch (maquinaCafe.TipoCafe)
            {
                case 1:
                    descricao = "Cappuccino";
                    valorCafe = 3.5;
                    break;
                case 2:
                    descricao = "Mocha";
                    valorCafe = 4;
                    break;
                case 3:
                    descricao = "Café com Leite";
                    valorCafe = 3;
                    break;
                default:
                    ViewBag.Messagem = "Selecione um dos tipos de cafés disponíveis";
                    break;
            }

            var umCentavo = maquinaCafe.UmCentavo * 0.01;
            var cincoCentavo = maquinaCafe.CincoCentavo * 0.05;
            var dezCentavo = maquinaCafe.DezCentavo * 0.10;
            var vinteCincoCentavo = maquinaCafe.VinteCincoCentavo * 0.25;
            var cinquentaCentavo = maquinaCafe.CinquentaCentavo * 0.5;
            var umReal = maquinaCafe.UmReal * 1.0;
            var valorAceito = dezCentavo + vinteCincoCentavo + cinquentaCentavo + umReal;
            var troco = valorAceito - valorCafe;

            var obj = new MaquinaCafe
            {
                UmCentavo = maquinaCafe.UmCentavo,
                CincoCentavo = maquinaCafe.CincoCentavo,
                DezCentavo = maquinaCafe.DezCentavo,
                VinteCincoCentavo = maquinaCafe.VinteCincoCentavo,
                CinquentaCentavo = maquinaCafe.CinquentaCentavo,
                UmReal = maquinaCafe.UmReal,
                TipoCafe = maquinaCafe.TipoCafe,
                ValorCafe = valorCafe,
                Descricao = descricao,
                Troco = troco,
                ValorAceito = valorAceito
            };

            if (valorAceito >= valorCafe)
            {
                return View(obj);
            }
            else
            {
                obj.Troco = 0;
                return View("Error", obj);
            }
        }
    }
}
