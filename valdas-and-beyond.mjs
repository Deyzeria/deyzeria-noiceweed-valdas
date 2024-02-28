Hooks.on("init", () => {

  addValdasWeaponProperties();

  var clothingArmor = {
    clothhat: "Clothings Helmet",
    clothpants: "Clothings Pants",
    clothhands: "Clothings Gloves",
    clothboots: "Clothings Boots",
    ring: "Ring",
    neck: "Necklace",
    face: "Face",
    back: "Back"
  }

  for (const [armor, name] of Object.entries(clothingArmor)) {
    CONFIG.DND5E.equipmentTypes[armor] = name;
    CONFIG.DND5E.armorProficienciesMap[armor] = true;
  }

  var lightArmor = {
    lighthat: "Light Helmet",
    lightpants: "Light Pants",
    lighthands: "Light Gloves",
    lightboots: "Light Boots"
  }

  for (const [armor, name] of Object.entries(lightArmor)) {
    CONFIG.DND5E.equipmentTypes[armor] = name;
    CONFIG.DND5E.armorProficienciesMap[armor] = 'lgt';
  }

  var mediumArmor = {
    mediumhat: "Medium Helmet",
    mediumpants: "Medium Pants",
    mediumhands: "Medium Gloves",
    mediumboots: "Medium Boots"
  }

  for (const [armor, name] of Object.entries(mediumArmor)) {
    CONFIG.DND5E.equipmentTypes[armor] = name;
    CONFIG.DND5E.armorProficienciesMap[armor] = 'med';
  }

  var heavyArmor = {
    heavyhat: "Heavy Helmet",
    heavypants: "Heavy Pants",
    heavyhands: "Heavy Gloves",
    heavyboots: "Heavy Boots"
  }

  for (const [armor, name] of Object.entries(heavyArmor)) {
    CONFIG.DND5E.equipmentTypes[armor] = name;
    CONFIG.DND5E.armorProficienciesMap[armor] = 'hvy';
  }
});

function addValdasWeaponProperties() {
  CONFIG.DND5E.weaponProperties.automatic = "Automatic";
  CONFIG.DND5E.weaponProperties.concealable = "Concealable";
  CONFIG.DND5E.weaponProperties.double = "Double";
  CONFIG.DND5E.weaponProperties.dry = "Dry";
  CONFIG.DND5E.weaponProperties.elegant = "Elegant";
  CONFIG.DND5E.weaponProperties.explosive = "Explosive";
  CONFIG.DND5E.weaponProperties.fist = "Fist";
  CONFIG.DND5E.weaponProperties.foregrip = "Foregrip";
  CONFIG.DND5E.weaponProperties.heat = "Heat";
  CONFIG.DND5E.weaponProperties.dry = "Dry";
  CONFIG.DND5E.weaponProperties.massive = "Massive";
  CONFIG.DND5E.weaponProperties.misfire = "Misfire";
  CONFIG.DND5E.weaponProperties.mounted = "Mounted";
  CONFIG.DND5E.weaponProperties.parrying = "Parrying";
  CONFIG.DND5E.weaponProperties.rocket = "Rocket";
  CONFIG.DND5E.weaponProperties.scatter = "Scatter";
  CONFIG.DND5E.weaponProperties.superheavy = "Superheavy";
  CONFIG.DND5E.weaponProperties.switch = "Switch";
  CONFIG.DND5E.weaponProperties.tension = "Tension";
  CONFIG.DND5E.weaponProperties.trip = "Trip";
  CONFIG.DND5E.weaponProperties.twinshot = "Twinshot";
}

Hooks.on("renderItemSheet5e", (app, html, data) => {
  if (data.item.type == 'equipment') {
    SetupArmorChoice(html, data);
  }
});

function SetupArmorChoice(html, data) {
  var toAddArray = [
    {
      label: "Extra Slots",
      values: {
        ring: "Ring",
        neck: "Necklace",
        face: "Face",
        back: "Back"
      }
    },
    {
      label: "Helmet",
      values: {
        clothhat: "Clothings Helmet",
        lighthat: "Light Helmet",
        mediumhat: "Medium Helmet",
        heavyhat: "Heavy Helmet",
      }
    },
    {
      label: "Gloves",
      values: {
        clothhands: "Clothings Gloves",
        lighthands: "Light Gloves",
        mediumhands: "Medium Gloves",
        heavyhands: "Heavy Gloves",
      }
    },
    {
      label: "Pants",
      values: {
        clothpants: "Clothings Pants",
        lightpants: "Light Pants",
        mediumpants: "Medium Pants",
        heavypants: "Heavy Pants",
      }
    },
    {
      label: "Boots",
      values: {
        clothboots: "Clothings Boots",
        lightboots: "Light Boots",
        mediumboots: "Medium Boots",
        heavyboots: "Heavy Boots",
      }
    }
  ];

  if (game.system.version == "2.4.1") {
    var choiseList = html.find(".details").find(`[name="system.armor.type"]`);
  }
  else {
    var choiseList = html.find(".details").find(`[name="system.type.value"]`);
  }

  toAddArray.forEach(element => {
    let choices = $(`<optgroup label="${element.label}"></optgroup>`);
    for (const [armor, name] of Object.entries(element.values)) {
      if (game.system.version == "2.4.1") {
        choices.append(`<option value="${armor}" ${data.system.armor.type == armor ? 'selected' : ''}>${name}</option>`);
      }
      else {
        choices.append(`<option value="${armor}" ${data.system.type.value == armor ? 'selected' : ''}>${name}</option>`);
      }
    }
    choiseList.append(choices);
  });
}