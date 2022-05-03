namespace ApiCarvajal.Models
{
    public class Combos
    {
        public int Codigo { get; set; }
        public string Valor { get; set; }
    }

    public class CombosRespuesta
    {
        public Respuesta respuesta { get; set; }
        public List<Combos> ddp { get; set; }
    }
}
