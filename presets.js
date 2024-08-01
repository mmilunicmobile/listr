lists = {
    "foods": "apples, artichoke, bacon, bread, buritto, cake, cheese, chocolate, cupcakes, dumplings, donuts, eggrolls, fajita, fish, garlic, granola, green beans, grits, ham, honey, hot dogs, ice cream, jerky, kale, lasagna, milkshake, noodles, pizza, pancakes, quesadilla, spinach, toast, waffles, wine, yogurt, zucchini",
    "emoji": "😂, ❤️, 🤣, 👍, 😭, 🙏, 😘, 🥰, 😁, 😅, 🔥, 🤦, 🤷, 👄, 😉, 😝, 👏, 😳, 👌, 😔, 😋, 😏, 🍑, 👉, 😩, 😃, 💦, 🤤, 💀, 💔, 🙃, 😬, 😈, 🥵, 😞, 💰, 🥴, 👈, 🍆",
    "mobs": "allay, axolotl, bat, bee, blaze, cat, cave spider, chicken, chicken jockey, cod, cow, creeper, dolphin, donkey, drowned, elder guardian, ender dragon, enderman, endermite, evoker, fox, frog, ghast, giant, glow squid, goat, guardian, horse, hoglin, husk, illusioner, iron golem, killer bunny, llama, magma cube, mooshroom, mule, ocelot, panda, parrot, phantom, pig, piglin, piglin brute, pillager, polar bear, pufferfish, rabbit, ravager, salmon, sheep, shulker, silverfish skeleton, skeleton horse, skeleton horseman, slime, snow golem, spider, spider jockey, squid, stray, strider, tadpole, trader llama, tropical fish, turtle, vex, villager, vindicator, wandering trader, warden, witch, wither, wither skeleton, wolf, zoglin, zombie, zombie horse, zombie villager, zombified piglin",
    "sus": "orange man, old man, sussy baka, sus, girl 100% gay, ur mom, balls, nuts, nut, eggplant, squirt gun, cream, sea men, zoophilia, banging, banana, autassassinophilia, alliphilia, \"fingers turn me on\" -A Light Switch",
    "celebrities": "Billie Eilish, Selena Gomez, Kylie Jenner, Cardi B, Dwayne Johnson, Tom Hanks, Kim Kardashian, Angelina Jolie, Johnny Depp, Justin Bieber, Oprah Winfrey, Jennifer Lopez, Brad Pitt, Will Smith, Tom Cruise, Ariana Grande, Robert Downey Jr., Adele, Emma Watson, Taylor Swift, Megan Fox, Charli D'Amelio, Khabane Lame, Bella Poarch, Addison Rae, Dua Lipa",
    "games": "Minecraft, Grand Theft Auto, Tetris, Wii Sports, PUBG, Super Mario Odessy, Kerbal Space Program, Elden Ring, Stray, Pokémon Legends: Arceus, Pokémon Sword and Shield, Horizon II, LEGO Star Wars: The Skywalker Saga, Madden NFL 22, Mario Kart 8 Deluxe",
    "clear": ""
};

function set_input_text(topic) {
    document.getElementById("csv_input").value = lists[topic];
    update_estimates()
}