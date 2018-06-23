using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data.Repositories;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IDatingRepository datingRepository;
        private readonly IMapper mapper;

        public UsersController(IDatingRepository datingRepository, IMapper mapper)
        {
            this.datingRepository = datingRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await this.datingRepository.GetUsers();
            var usersToReturn = this.mapper.Map<IEnumerable<UserForListDto>>(users);
            return Ok(usersToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await this.datingRepository.GetUser(id);
            var userToReturn = this.mapper.Map<UserForDetailedDto>(user);
            return Ok(userToReturn);
        }

         [HttpPut("{id}")]
         public async Task<IActionResult> UpdateUser(int id, [FromBody] UserForUpdateDto userForUpdateDto)
         {
             if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromRepo = await this.datingRepository.GetUser(id);

            if(userFromRepo == null)
                return NotFound($"Could not find user with an ID of {id}");

            if(currentUserId != userFromRepo.Id)
                return Unauthorized();

            this.mapper.Map(userForUpdateDto, userFromRepo);

            if(await this.datingRepository.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");
         }

    }
}