using System.ComponentModel.DataAnnotations;

namespace ApiCarvajal.Models
{
    public class VuelosSalientes
    {
        [Key]
        public int VuelosId { get; set; }
        public string CiudadOrigen { get; set; }
        public string CiudadDestino { get; set; }
        public string Fecha { get; set; }
        public string HoraSalida { get; set; }
        public string HoraLlegada { get; set; }
        public string NumeroVuelo { get; set; }
        public string Aerolinea { get; set; }
        public string EstadoVuelo { get; set; }
    }

    public class VuelosCrear
    {
        [Key]
        public string CiudadOrigen { get; set; }
        public string CiudadDestino { get; set; }
        public string Fecha { get; set; }
        public string HoraSalida { get; set; }
        public string HoraLlegada { get; set; }
        public string NumeroVuelo { get; set; }
        public string Aerolinea { get; set; }
        public string EstadoVuelo { get; set; }

    }

    public class VuelosSalientesRespuesta
    {
        public Respuesta respuesta { get; set; }
        public List<VuelosSalientes> VuelosSalientes { get; set; }
    }


}
