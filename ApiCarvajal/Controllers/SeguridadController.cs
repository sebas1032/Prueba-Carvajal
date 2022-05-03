#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiCarvajal.Data;
using ApiCarvajal.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ApiCarvajal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeguridadController : ControllerBase
    {
        private readonly ApiCarvajalContext _context;

        public SeguridadController(ApiCarvajalContext context)
        {
            _context = context;
        }
        //api/Login

        [HttpPost("login")]

        public async Task<Respuesta> PostLogin(Login login)
        {

            var parameters = new[] {
            new SqlParameter("@Correo", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = login.Correo },
            new SqlParameter("@Contraseña", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = login.Contraseña },


            new SqlParameter("@pCodigo", SqlDbType.Int) { Direction = ParameterDirection.Output, Value = 0 },
            new SqlParameter("@pMensaje", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Value = "", Size = 250 },
            };

            //Procedimiento almacenado que NO retorna una consulta 
            int returnValue = await _context.Database.ExecuteSqlRawAsync("[dbo].[login] @Correo, @Contraseña,@pCodigo OUTPUT, @pMensaje OUTPUT", parameters);


            //se instancia la clase Respuesta y se carga en la variable respuesta
            Respuesta respuesta = new Respuesta();

            //se carga en la variable respuesta los datos devueltos por procedimiento almacenado relacionado con pCodigo y pMensaje
            respuesta.Codigo = parameters[2].Value.ToString();//el item corresponde al orden del array parameters
            respuesta.Mensaje = parameters[3].Value.ToString();//el item corresponde al orden del array parameters

            return respuesta;

        }



        private bool LoginExists(string id)
        {
            return _context.Login.Any(e => e.Correo == id);
        }
    }
}
