export const projectRooms: Record<string, { planImage?: string; floors: Record<string, { name: string; area: string }[]> }> = {
  "1": {
    floors: {
      "1-ci Mərtəbə": [{ name: "Salon", area: "34 m²" }, { name: "Mətbəx", area: "14 m²" }, { name: "Yataq otağı 1", area: "16 m²" }],
      "2-ci Mərtəbə": [{ name: "Master Yataq Otağı 1", area: "21 m²" }, { name: "Master Yataq Otağı 2", area: "27 m²" }]
    }
  },
  "2": {
    floors: {
      "1-ci Mərtəbə": [
        { name: "Salon", area: "25 m²" },
        { name: "Mətbəx", area: "12 m²" },
        { name: "Yataq Otağı 1", area: "14 m²" },
        { name: "Hamam", area: "5 m²" },
        { name: "Antre", area: "8 m²" },
        { name: "Teras", area: "12 m²" }
      ],
      "2-ci Mərtəbə": [
        { name: "Master Yataq Otağı", area: "18 m²" },
        { name: "Yataq Otağı 2", area: "14 m²" },
        { name: "Yataq Otağı 3", area: "14 m²" },
        { name: "Banyo", area: "6 m²" },
        { name: "Hol", area: "8 m²" },
        { name: "Balkon", area: "6 m²" }
      ]
    }
  },
  kamelya: {
    floors: {
      "1-ci Mərtəbə": [
        { name: "Salon", area: "28 m²" },
        { name: "Mətbəx", area: "12 m²" },
        { name: "Hamam", area: "6 m²" },
        { name: "Antre", area: "8 m²" },
        { name: "Teras", area: "10 m²" }
      ],
      "2-ci Mərtəbə": [
        { name: "Master Yataq Otağı", area: "16 m²" },
        { name: "Yataq Otağı 2", area: "12 m²" },
        { name: "Yataq Otağı 3", area: "12 m²" },
        { name: "Banyo", area: "6 m²" },
        { name: "Balkon", area: "6 m²" },
        { name: "Hol", area: "8 m²" }
      ]
    }
  },
  karanfil: {
    floors: {
      "1-ci Mərtəbə": [
        { name: "Salon + Mətbəx", area: "30 m²" },
        { name: "Master Yataq Otağı", area: "14 m²" },
        { name: "Yataq Otağı", area: "12 m²" },
        { name: "Banyo", area: "6 m²" },
        { name: "Teras", area: "15 m²" }
      ]
    }
  },
  ladin: {
    floors: {
      "1-ci Mərtəbə": [
        { name: "Salon", area: "35 m²" },
        { name: "Mətbəx", area: "15 m²" },
        { name: "Yataq Otağı 1", area: "12 m²" },
        { name: "Hamam", area: "6 m²" },
        { name: "Qaraj", area: "25 m²" },
        { name: "Teras", area: "20 m²" }
      ],
      "2-ci Mərtəbə": [
        { name: "Master Yataq Otağı", area: "20 m²" },
        { name: "Yataq Otağı 2", area: "14 m²" },
        { name: "Yataq Otağı 3", area: "14 m²" },
        { name: "Banyo", area: "8 m²" },
        { name: "Hol", area: "10 m²" }
      ]
    }
  },
  reyhan: {
    floors: {
      "1-ci Mərtəbə": [
        { name: "Salon + Mətbəx", area: "22 m²" },
        { name: "Yataq Otağı", area: "12 m²" },
        { name: "Banyo", area: "5 m²" },
        { name: "Antre", area: "4 m²" },
        { name: "Teras", area: "14 m²" }
      ]
    }
  },
  gurgen: {
    floors: {
      "1-ci Mərtəbə": [
        { name: "Salon + Mətbəx", area: "35 m²" },
        { name: "Yataq Otağı 1", area: "12 m²" },
        { name: "Yataq Otağı 2", area: "10 m²" },
        { name: "Banyo", area: "5 m²" },
        { name: "Hol", area: "6 m²" }
      ],
      "2-ci Mərtəbə": [
        { name: "Master Yataq Otağı", area: "18 m²" },
        { name: "Yataq Otağı 2", area: "14 m²" },
        { name: "Banyo", area: "6 m²" },
        { name: "Hol", area: "7 m²" }
      ]
    }
  },
  sumbul: {
    floors: {
      "1-ci Mərtəbə": [
        { name: "Salon", area: "22 m²" },
        { name: "Mətbəx", area: "10 m²" },
        { name: "Master Yataq Otağı", area: "15 m²" },
        { name: "Yataq Otağı", area: "11 m²" },
        { name: "Banyo", area: "5 m²" },
        { name: "Hol", area: "4 m²" },
        { name: "Antre", area: "4 m²" }
      ]
    }
  },
  ihlamur: {
    floors: {
      "1-ci Mərtəbə": [
        { name: "Salon", area: "30 m²" },
        { name: "Mətbəx", area: "15 m²" },
        { name: "Master Yataq Otağı", area: "16 m²" },
        { name: "Yataq Otağı 2", area: "12 m²" },
        { name: "Yataq Otağı 3", area: "12 m²" },
        { name: "Banyo", area: "6 m²" },
        { name: "Antre", area: "10 m²" },
        { name: "Teras", area: "25 m²" }
      ]
    }
  },
  yonca: {
    floors: {
      "1-ci Mərtəbə": [
        { name: "Salon + Mətbəx", area: "35 m²" },
        { name: "Yataq Otağı 1", area: "14 m²" },
        { name: "Hamam", area: "6 m²" },
        { name: "Hol", area: "8 m²" }
      ],
      "2-ci Mərtəbə": [
        { name: "Master Yataq Otağı", area: "20 m²" },
        { name: "Yataq Otağı 2", area: "14 m²" },
        { name: "Yataq Otağı 3", area: "14 m²" },
        { name: "Hamam", area: "6 m²" },
        { name: "Hol", area: "10 m²" }
      ]
    }
  },
classic: {
    floors: {
      "1-ci Mərtəbə": [
        { name: "Mətbəx + Qonaq Otağı", area: "29.82 m²" },
        { name: "Texniki Otaq", area: "6.05 m²" },
        { name: "Hol", area: "4.95 m²" },
        { name: "Tambur", area: "3.85 m²" },
        { name: "Krilso (Teras)", area: "4.35 m²" }
      ],
      "2-ci Mərtəbə": [
        { name: "Yataq Otağı 1", area: "15.33 m²" },
        { name: "Yataq Otağı 2", area: "14.07 m²" },
        { name: "Hamam (S/U)", area: "6.05 m²" },
        { name: "Hol", area: "5.98 m²" },
        { name: "Balkon", area: "4.35 m²" }
      ]
    }
  },
  sogut: {
    floors: {
      "1-ci Mərtəbə": [
        { name: "Salon 1", area: "20 m²" },
        { name: "Salon 2", area: "18 m²" },
        { name: "Mətbəx", area: "15 m²" },
        { name: "Master Yataq Otağı", area: "18 m²" },
        { name: "Yataq Otağı 1", area: "12 m²" },
        { name: "Yataq Otağı 2", area: "12 m²" },
        { name: "Hamam 1", area: "5 m²" },
        { name: "Hamam 2", area: "5 m²" },
        { name: "Hol/Antre", area: "10 m²" }
      ]
    }
  },
  kavak: {
    floors: {
      "1-ci Mərtəbə": [
        { name: "Salon + Mətbəx", area: "32 m²" },
        { name: "Master Yataq Otağı", area: "14 m²" },
        { name: "Yataq Otağı 2", area: "12 m²" },
        { name: "Yataq Otağı 3", area: "10 m²" },
        { name: "Banyo", area: "6 m²" },
        { name: "Antre", area: "8 m²" },
        { name: "Teras", area: "15 m²" }
      ]
    }
  },
  koknar: {
    floors: {
      "1-ci Mərtəbə": [
        { name: "Salon + Mətbəx", area: "28 m²" },
        { name: "Master Yataq Otağı", area: "14 m²" },
        { name: "Yataq Otağı", area: "10 m²" },
        { name: "Banyo", area: "5 m²" },
        { name: "Hol", area: "4 m²" },
        { name: "Teras", area: "15 m²" }
      ]
    }
  },
  "makar": {
    planImage: "/projects/makar-plan.png",
    floors: {
      "1-ci Mərtəbə": [
        { name: "Living Room", area: "35 m²" },
        { name: "Kitchen", area: "12 m²" },
        { name: "Dinning", area: "10 m²" },
        { name: "Bed 4", area: "12 m²" },
        { name: "Store", area: "5 m²" },
        { name: "WC", area: "4 m²" }
      ],
      "2-ci Mərtəbə": [
        { name: "Master Bed", area: "18 m²" },
        { name: "Gym Room", area: "15 m²" },
        { name: "Bed 2", area: "14 m²" },
        { name: "Bed 3", area: "14 m²" },
        { name: "WC", area: "6 m²" },
        { name: "Balcony", area: "5 m²" }
      ]
    }
  },
  "makar2": {
    planImage: "/projects/makar2-plan.png",
    floors: {
      "1-ci Mərtəbə": [
        { name: "Living Room", area: "30 m²" },
        { name: "Kitchen", area: "12 m²" },
        { name: "Dinning", area: "10 m²" },
        { name: "Bed 4", area: "12 m²" },
        { name: "Store", area: "4 m²" },
        { name: "WC", area: "4 m²" }
      ],
      "2-ci Mərtəbə": [
        { name: "Master Bed", area: "18 m²" },
        { name: "Gym Room", area: "15 m²" },
        { name: "Bed 2", area: "14 m²" },
        { name: "Bed 3", area: "14 m²" },
        { name: "WC", area: "6 m²" },
        { name: "Balcony", area: "5 m²" }
      ]
    }
  },
  "modern": {
    planImage: "/projects/modern-plan.png",
    floors: {
      "1-ci Mərtəbə": [
        { name: "Living Room (Salon)", area: "35 m²" },
        { name: "Kitchen (Mətbəx)", area: "25 m²" },
        { name: "Dinning", area: "35 m²" },
        { name: "Bedroom 5", area: "15 m²" },
        { name: "WC", area: "4.3 m²" },
        { name: "Store", area: "7 m²" },
        { name: "Car Parking", area: "25 m²" }
      ],
      "2-ci Mərtəbə": [
        { name: "Master Bedroom", area: "15.7 m²" },
        { name: "Bedroom 2", area: "15.7 m²" },
        { name: "Bedroom 3", area: "14.8 m²" },
        { name: "Bedroom 4", area: "11.1 m²" },
        { name: "WC", area: "5 m²" }
      ]
    }
  }
};