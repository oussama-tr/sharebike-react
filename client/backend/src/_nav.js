export default {
  items: [
    {
      title: true,
      name: "SHARE BIKE ADMINSPACE"
    },
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer"
    },
    {
      name: "Page Acceuil",
      icon: "fa fa-home",
      children: [
        {
          name: "Carrousel",
          icon: "fa fa-ellipsis-h",
          children: [
            {
              name: "Ajouter",
              url: "/slider/ajouter",
              icon: "fa fa-plus"
            },
            {
              name: "Afficher",
              url: "/slider",
              icon: "fa fa-bars"
            }
          ]
        }
      ]
    },
    {
      name: "Evénements",
      icon: "fa fa-quote-right",
      children: [
        {
          name: "Ajouter",
          url: "/events/add",
          icon: "fa fa-plus"
        },
        {
          name: "Afficher",
          url: "/events/show",
          icon: "fa fa-bars"
        }
      ]
    },
    {
      name: "Stations",
      icon: "fa fa-quote-right",
      children: [
        {
          name: "Map",
          url: "/stations/Map",
          icon: "fa fa-plus"
        },
        {
          name: "Ajouter",
          url: "/stations/add",
          icon: "fa fa-plus"
        },
        {
          name: "Afficher",
          url: "/stations/show",
          icon: "fa fa-bars"
        }
      ]
    }
    ,
    {
      name: "Vélos",
      icon: "fa fa-quote-right",
      children: [
        {
          name: "BikesMap",
          url: "/bikes/Map",
          icon: "fa fa-plus"
        },
        {
          name: "Ajouter",
          url: "/bikes/add",
          icon: "fa fa-plus"
        },
        {
          name: "Afficher",
          url: "/bikes/show",
          icon: "fa fa-bars"
        }
      ]
    }
  ]
};
