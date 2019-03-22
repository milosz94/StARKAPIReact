using Microsoft.EntityFrameworkCore.Migrations;

namespace StARKS.Migrations
{
    public partial class init3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "State",
                table: "Students",
                maxLength: 256,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Courses",
                maxLength: 100,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "State",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "Courses");
        }
    }
}
