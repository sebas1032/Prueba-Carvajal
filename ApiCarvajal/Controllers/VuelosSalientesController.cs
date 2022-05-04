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
    public class VuelosSalientesController : ControllerBase
    {
        private readonly ApiCarvajalContext _context;

        public VuelosSalientesController(ApiCarvajalContext context)
        {
            _context = context;
        }
        // GET: api/VuelosSalientes
        [HttpGet("consultar/{VuelosId}")]

        public async Task<IEnumerable<VuelosSalientes>> VuelosSalientes(int VuelosId)
        {

            var parameters = new[] {
              new SqlParameter("@ParqueaderoId", SqlDbType.Int) { Direction = ParameterDirection.Input, Value = VuelosId },
            new SqlParameter("@pCodigo", SqlDbType.Int) { Direction = ParameterDirection.Output, Value = 0 },
            new SqlParameter("@pMensaje", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Value = "", Size = 250 },
            };

            //Procedimiento almacenado que retorna una consulta se usa _context.Registro.FromSqlRaw y al final se pone ToListAsync()
            List<VuelosSalientes> consulta = await _context.VuelosSalientes.FromSqlRaw("[dbo].[vuelos_salientes_consultar]@ParqueaderoId,@pCodigo OUTPUT, @pMensaje OUTPUT", parameters).ToListAsync();

            //debe existir un objeto que contenga la repuesta y el listado
            VuelosSalientesRespuesta vuelosSalientesRespuesta = new VuelosSalientesRespuesta();

            //se instancia la clase Respuesta y se carga en la variable respuesta
            Respuesta respuesta = new Respuesta();

            //se carga en la variable respuesta los datos devueltos por procedimiento almacenado relacionado con pCodigo y pMensaje
            respuesta.Codigo = parameters[1].Value.ToString();//el item corresponde al orden del array parameters
            respuesta.Mensaje = parameters[2].Value.ToString();//el item corresponde al orden del array parameters

            //se unen el listado entregado por el procedimiento almacenado y la respuesta en un solo objeto que es el que se va a retornar
            vuelosSalientesRespuesta.respuesta = respuesta;
            vuelosSalientesRespuesta.VuelosSalientes = consulta;

            return consulta;
        }


        //API para programar un nuevo vuelo

        [HttpPost("crear")]

        public async Task<Respuesta> PostCrearParking(VuelosCrear vuelos)
        {

            var parameters = new[] {
            new SqlParameter("@CiudadOrigen", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = vuelos.CiudadOrigen },
            new SqlParameter("@CiudadDestino", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = vuelos.CiudadDestino },
            new SqlParameter("@Fecha", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = vuelos.Fecha },
            new SqlParameter("@HoraSalida", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = vuelos.HoraSalida },
            new SqlParameter("@HoraLlegada", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = vuelos.HoraLlegada },
            new SqlParameter("@NumeroVuelo", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = vuelos.NumeroVuelo },
            new SqlParameter("@Aerolinea", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = vuelos.Aerolinea },
            new SqlParameter("@EstadoVuelo", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = vuelos.EstadoVuelo },
            

            new SqlParameter("@pCodigo", SqlDbType.Int) { Direction = ParameterDirection.Output, Value = 0 },
            new SqlParameter("@pMensaje", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Value = "", Size = 250 },
            };

            //Procedimiento almacenado que NO retorna una consulta 
            int returnValue = await _context.Database.ExecuteSqlRawAsync("[dbo].[vuelos_salientes_crear] @CiudadOrigen, @CiudadDestino, @Fecha, @HoraSalida, @HoraLlegada, @NumeroVuelo, @Aerolinea, @EstadoVuelo,@pCodigo OUTPUT, @pMensaje OUTPUT", parameters);


            //se instancia la clase Respuesta y se carga en la variable respuesta
            Respuesta respuesta = new Respuesta();

            //se carga en la variable respuesta los datos devueltos por procedimiento almacenado relacionado con pCodigo y pMensaje
            respuesta.Codigo = parameters[8].Value.ToString();//el item corresponde al orden del array parameters
            respuesta.Mensaje = parameters[9].Value.ToString();//el item corresponde al orden del array parameters

            return respuesta;

        }


        [HttpGet("eliminar/{VuelosId}")]

        public async Task<Respuesta> GetEliminarVuelos(int VuelosId)
        {

            var parameters = new[] {
                new SqlParameter("@VuelosId", SqlDbType.Int) { Direction = ParameterDirection.Input, Value = VuelosId },
            new SqlParameter("@pCodigo", SqlDbType.Int) { Direction = ParameterDirection.Output, Value = 0 },
            new SqlParameter("@pMensaje", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Value = "", Size = 250 },
            };

            //Procedimiento almacenado que NO retorna una consulta 
            int returnValue = await _context.Database.ExecuteSqlRawAsync("[dbo].[vuelos_eliminar] @VuelosId, @pCodigo OUTPUT, @pMensaje OUTPUT", parameters);


            //se instancia la clase Respuesta y se carga en la variable respuesta
            Respuesta respuesta = new Respuesta();

            //se carga en la variable respuesta los datos devueltos por procedimiento almacenado relacionado con pCodigo y pMensaje
            respuesta.Codigo = parameters[1].Value.ToString();//el item corresponde al orden del array parameters
            respuesta.Mensaje = parameters[2].Value.ToString();//el item corresponde al orden del array parameters

            return respuesta;

        }

        //api editar vuelos - POST
        [HttpPost("editar")]

        public async Task<Respuesta> PostEditarVuelos(VuelosSalientes vuelos)
        {

            var parameters = new[] {
             new SqlParameter("@VuelosId", SqlDbType.Int) { Direction = ParameterDirection.Input, Value = vuelos.VuelosId },
                new SqlParameter("@CiudadOrigen", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = vuelos.CiudadOrigen },
            new SqlParameter("@CiudadDestino", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = vuelos.CiudadDestino },
            new SqlParameter("@Fecha", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = vuelos.Fecha },
            new SqlParameter("@HoraSalida", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = vuelos.HoraSalida },
            new SqlParameter("@HoraLlegada", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = vuelos.HoraLlegada },
            new SqlParameter("@NumeroVuelo", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = vuelos.NumeroVuelo },
            new SqlParameter("@Aerolinea", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = vuelos.Aerolinea },
            new SqlParameter("@EstadoVuelo", SqlDbType.VarChar) { Direction = ParameterDirection.Input, Value = vuelos.EstadoVuelo },


            new SqlParameter("@pCodigo", SqlDbType.Int) { Direction = ParameterDirection.Output, Value = 0 },
            new SqlParameter("@pMensaje", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Value = "", Size = 250 },
            };

            //Procedimiento almacenado que NO retorna una consulta 
            int returnValue = await _context.Database.ExecuteSqlRawAsync("[dbo].[vuelos_editar] @VuelosId,@CiudadOrigen, @CiudadDestino, @Fecha, @HoraSalida, @HoraLlegada, @NumeroVuelo, @Aerolinea, @EstadoVuelo,@pCodigo OUTPUT, @pMensaje OUTPUT", parameters);


            //se instancia la clase Respuesta y se carga en la variable respuesta
            Respuesta respuesta = new Respuesta();

            //se carga en la variable respuesta los datos devueltos por procedimiento almacenado relacionado con pCodigo y pMensaje
            respuesta.Codigo = parameters[9].Value.ToString();//el item corresponde al orden del array parameters
            respuesta.Mensaje = parameters[10].Value.ToString();//el item corresponde al orden del array parameters

            return respuesta;

        }


        // GET: api/Combos
        [HttpGet("consultarcombos/{Tipo}")]

        public async Task<IEnumerable<Combos>> Combos(int Tipo)
        {

            var parameters = new[] {
              new SqlParameter("@Tipo", SqlDbType.Int) { Direction = ParameterDirection.Input, Value = Tipo },
            new SqlParameter("@pCodigo", SqlDbType.Int) { Direction = ParameterDirection.Output, Value = 0 },
            new SqlParameter("@pMensaje", SqlDbType.VarChar) { Direction = ParameterDirection.Output, Value = "", Size = 250 },
            };

            //Procedimiento almacenado que retorna una consulta se usa _context.Registro.FromSqlRaw y al final se pone ToListAsync()
            List<Combos> consulta = await _context.Combos.FromSqlRaw("[dbo].[inputs_consultar]@Tipo,@pCodigo OUTPUT, @pMensaje OUTPUT", parameters).ToListAsync();

            //debe existir un objeto que contenga la repuesta y el listado
            CombosRespuesta combosRespuesta = new CombosRespuesta();

            //se instancia la clase Respuesta y se carga en la variable respuesta
            Respuesta respuesta = new Respuesta();

            //se carga en la variable respuesta los datos devueltos por procedimiento almacenado relacionado con pCodigo y pMensaje
            respuesta.Codigo = parameters[1].Value.ToString();//el item corresponde al orden del array parameters
            respuesta.Mensaje = parameters[2].Value.ToString();//el item corresponde al orden del array parameters

            //se unen el listado entregado por el procedimiento almacenado y la respuesta en un solo objeto que es el que se va a retornar
            combosRespuesta.respuesta = respuesta;
            combosRespuesta.combos = consulta;

            return consulta;
        }




    }
}