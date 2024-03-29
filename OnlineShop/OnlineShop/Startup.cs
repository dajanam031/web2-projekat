using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using OnlineShop.Infrastructure;
using OnlineShop.Interfaces;
using OnlineShop.Mapping;
using OnlineShop.Models;
using OnlineShop.Repositories;
using OnlineShop.Repositories.Interfaces;
using OnlineShop.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShop
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers();
            services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000")
                               .AllowAnyMethod()
                               .AllowAnyHeader()
                               .AllowCredentials();
                    });
            });

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IItemService, ItemService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IOrderService, OrderService>();

            services.AddDbContext<ShopDbContext>(options => 
            options.UseSqlServer(Configuration.GetConnectionString("MyConnectionString")));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "online shop", Version = "v1" });
                c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Token:",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "bearer"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                        {
                          {
                            new OpenApiSecurityScheme
                            {
                              Reference = new OpenApiReference
                              {
                                Type=ReferenceType.SecurityScheme,
                                Id="Bearer"
                              }
                            },
                            new string[]{}
                          }
                        });
            });

            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            services.AddScoped<IRepository<User>, UserRepository>();
            services.AddScoped<IRepository<Item>, ItemRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IRepository<OrderItem>,  OrderItemRepository>();

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = "https://localhost:5001",
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetSection("SecretKey").Value))
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "OnlineShop v1"));
            }

            app.UseCors("AllowReactApp");
            app.UseRouting();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(@"C:\Users\Dajana\OneDrive\Desktop\web 2\web2-projekat\OnlineShop\OnlineShop\Images"),
                RequestPath = "/Images"
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
