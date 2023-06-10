using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Hosting.Server;
using OnlineShop.Models;
using System.Net.Http;

namespace OnlineShop.Helpers
{
    public class ImageHandler
    {
        public static async Task<string> SaveImageFile(IFormFile imageFile, string targetFolderPath)
        {
            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);

            string filePath = Path.Combine(targetFolderPath, fileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return filePath;
        }

        public async static Task<string> SaveGoogleImage(string imageUrl, string targetFolderPath)
        {
            string fileName = $"{Guid.NewGuid()}.jpg";

            string filePath = Path.Combine(targetFolderPath, fileName);

            using var httpClient = new HttpClient();
            try
            {
                var imageBytes = await httpClient.GetByteArrayAsync(imageUrl);

                await File.WriteAllBytesAsync(filePath, imageBytes);

                return filePath;
            }
            catch (Exception ex)
            {
                throw new Exception("Error saving profile picture.", ex);
            }
        }

    }
}
