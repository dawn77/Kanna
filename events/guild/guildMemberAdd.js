//%PAQUETES
const { createCanvas, loadImage } = require("canvas");
const { join } = require("path");
//%PAQUETES

//TODO |MODELOS|

const userModel = require("../../models/userSchema");

//TODO |MODELOS|


module.exports = async (client, discord, member) => {

  //TODO |REGISTRAR USUARIO|

  try {
    let user = await userModel.create({
      userID: member.id,
      userName: member.displayName,
      serverID: member.guild.id,
    });
    user.save();
  } catch (error) {
    console.log(error);
  }

  //TODO |REGISTRAR USUARIO|
  //%CANVAS

  const canvas = createCanvas(1200, 635); //Tamaño de nuestra imagen
  const ctx = canvas.getContext("2d");

  const background = await loadImage(join(__dirname, "../../img", "bg1.jpg")); //Imagen de fondo

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#000000";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  const name = member.user.username;
//*Color de Letras Usuario
  if (name.length >= 16) {
    ctx.font = "bold 70px Sans";
    ctx.fillStyle = "#be8bed";
    ctx.fillText(name, canvas.width / 2, canvas.height / 2 + 100);
  } else {
    ctx.font = "bold 100px Sans";
    ctx.fillStyle = "#be8bed";
    ctx.fillText(name, canvas.width / 2, canvas.height / 2 + 100);
  }
//*Color de Letras Usuario

//TODO |Texto Bienvenida|
  const server = "Bienvenido a: \n" + member.guild.name;

  ctx.font = "bold 75px sans-serif";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(server, canvas.width / 2, canvas.height / 2 - 100);

  ctx.beginPath();
  ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await loadImage(
    member.user.displayAvatarURL({ format: "png" })
  );

  ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);

  const imagen = new discord.MessageAttachment(canvas.toBuffer(), "img.png");

//TODO |Texto Bienvenida|

//? ROL
  const guild = member.guild;
  const rol = guild.roles.cache.find((role) => role.name === "coder");
  member.roles.add(rol);
//? ROL
//? ID BIENVENIDA
  const channel = member.guild.channels.cache.find(
    (channel) => channel.id === "1052701371205427321"
  );
//? ID REGLAS
  const reglas = member.guild.channels.cache.find(
    (channel) => channel.id === "1052723293691584632"
  );
//!Texto Embed
  const me = new discord.MessageEmbed()
    .setColor([190, 140, 237])
    .setTitle("Bienvenida")
    .setDescription(`Te invitamos a leer las reglas en: ${reglas}\nY esperamos que disfrutes tu tiempo aqui!!\n\nAtte: Lider y Sublideres de kL`)
    .setImage("attachment://img.png")
    .setTimestamp()
    .setFooter(member.guild.name);
//!Texto Embed
  channel.send({ embeds: [me], files: [imagen] });
};