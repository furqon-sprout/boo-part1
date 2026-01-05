"use strict";

const express = require("express");
const router = express.Router();

const Profile = require("../models/Profile");

const defaultProfiles = [
  {
    id: 1,
    name: "A Martinez",
    description: "Adolph Larrue Martinez III.",
    mbti: "ISFJ",
    enneagram: "9w3",
    variant: "sp/so",
    tritype: 725,
    socionics: "SEE",
    sloan: "RCOEN",
    psyche: "FEVL",
    image: "https://soulverse.boo.world/images/1.png",
  },
];

const loadProfilesFromDB = async () => {
  try {
    const dbProfiles = await Profile.find({}).sort({ created_at: -1 }).exec();
    return dbProfiles.length > 0 ? dbProfiles : defaultProfiles;
  } catch (error) {
    console.error("Error loading profiles from DB:", error);
    return defaultProfiles;
  }
};

module.exports = function () {
  router.get("/create", function (req, res) {
    res.render("create_profile");
  });

  router.post("/profiles", async function (req, res, next) {
    try {
      const {
        name,
        description,
        mbti,
        enneagram,
        variant,
        tritype,
        socionics,
        sloan,
        psyche,
        image,
      } = req.body;
      const newProfile = new Profile({
        name,
        description,
        mbti,
        enneagram,
        variant,
        tritype,
        socionics,
        sloan,
        psyche,
        image,
      });
      await newProfile.save();

      res.redirect("/")
    } catch (error) {
      next(error);
    }
  });

  router.get("/*", async function (req, res, next) {
    try {
      const profiles = await loadProfilesFromDB();
      res.render("profile_template", { profile: profiles[0] });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
