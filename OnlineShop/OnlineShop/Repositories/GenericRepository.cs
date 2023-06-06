using Microsoft.EntityFrameworkCore;
using OnlineShop.Infrastructure;
using OnlineShop.Models;
using OnlineShop.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace OnlineShop.Repositories
{
    public class GenericRepository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly ShopDbContext _dbContext;
        protected readonly DbSet<TEntity> _dbSet;

        public GenericRepository(ShopDbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = dbContext.Set<TEntity>();
        }
        public async Task<IEnumerable<TEntity>> GetAll() {
            IEnumerable<TEntity> entities = await _dbSet.ToListAsync();
            return entities;
        }

        public async Task<TEntity> GetById(params object[] keys) {
            TEntity entity = await _dbSet.FindAsync(keys);
            return entity;
        }

        public async Task Create(TEntity entity) {
            await _dbSet.AddAsync(entity);
        } 

        public void Delete(TEntity entity) => _dbSet.Remove(entity);

        public async Task SaveChanges() {
            await _dbContext.SaveChangesAsync();
        }

        public async Task<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate) {
            TEntity entity = await _dbSet.Where(predicate).FirstOrDefaultAsync();
            return entity;
        }

        public async Task<IEnumerable<TEntity>> FindAllBy(Expression<Func<TEntity, bool>> predicate)
        {
            IEnumerable<TEntity> entities = await _dbSet.Where(predicate).ToListAsync();
            return entities;
        }
    }
}

