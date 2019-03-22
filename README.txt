Required:
	NodeJS
	ASP.NET CORE

To start:
	Client app:
		cd {location}/StARKS/StARKS.Client
	
		npm install
		npm start
	Server app:
		configure database settings
		open in Visual Studio and run
		

To change default database change connectionstring in:
	   {location}/StARKS/StARKS/appsettings.json   => "ConnectionStrings" => "DefaultConnection"
		run:
			Add-Migration
			Update-Database
	
	
To change API url change "baseUrl"
   {location}/StARKS/StARKS.Client/src/config.json