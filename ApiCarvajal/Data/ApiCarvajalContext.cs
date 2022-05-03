#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ApiCarvajal.Models;

namespace ApiCarvajal.Data
{
    public class ApiCarvajalContext : DbContext
    {
        public ApiCarvajalContext (DbContextOptions<ApiCarvajalContext> options)
            : base(options)
        {
        }

        public DbSet<ApiCarvajal.Models.Login> Login { get; set; }

        public DbSet<ApiCarvajal.Models.VuelosSalientes> VuelosSalientes { get; set; }
    }
}
