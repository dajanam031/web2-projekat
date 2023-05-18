using Microsoft.EntityFrameworkCore;
using OnlineShop.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

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
        public virtual IEnumerable<TEntity> GetAll() => _dbSet.AsEnumerable();

        public virtual TEntity GetById(long id) => _dbSet.Find(id);

        public void Create(TEntity entity) => _dbSet.Add(entity);

        public void Delete(TEntity entity) => _dbSet.Remove(entity);

        public void SaveChanges() => _dbContext.SaveChanges();

        public virtual IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate) => _dbSet.Where(predicate).AsEnumerable();
    }
}

