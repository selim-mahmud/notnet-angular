using System;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext dataContext;

        public AuthRepository(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }
        public async Task<User> Login(string userName, string password)
        {
            var user = await this.dataContext.Users.FirstOrDefaultAsync(u => u.Username == userName);

            if(user == null)
                return null;

            if(!this.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                for(int i =0; i < computedHash.Length; i++)
                {
                    if(computedHash[i] != passwordHash[i]) return false;
                }
            }

            return true;

            
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, PasswordSalt;
            this.CreatePasswordHash(password, out passwordHash, out PasswordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = PasswordSalt;

            await this.dataContext.Users.AddAsync(user);
            await this.dataContext.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string userName)
        {
            if(await this.dataContext.Users.AnyAsync(u => u.Username == userName))
                return true;

            return false;
        }
    }
}