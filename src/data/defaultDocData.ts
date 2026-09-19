import { Vehicle } from '../types';

export const DEFAULT_GOOGLE_DOC_ID = "1a8B9cDef-BlueDiamonAuto-Inventory2026";
export const DEFAULT_GOOGLE_DOC_URL = "https://docs.google.com/document/d/1a8B9cDef-BlueDiamonAuto-Inventory2026/edit";

export const SAMPLE_GOOGLE_DOC_TEXT = `BLUE DIAMON AUTO - LIVE INVENTORY & PRICING SHEET
Official Dealership Master Inventory Document (Auto-synced to Website)
Updated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

=======================================================
VEHICLE 1: 2023 BMW M340i xDrive Sedan
=======================================================
Price: $47,991
Original Price: $51,500
Special Deal: Yes
Special Badge: Diamond Deal of the Week - Save $3,510
Mileage: 19,420 miles
Body Style: Sedan
Exterior Color: Portimao Blue Metallic
Interior Color: Cognac Vernasca Leather
Engine: 3.0L BMW TwinPower Turbo Inline 6-Cylinder (382 hp)
Transmission: 8-Speed Sport Steptronic Automatic
Drivetrain: xDrive All-Wheel Drive
Fuel Type: Gas
MPG: 23 City / 32 Hwy
VIN: WBA5R7C58PF729104
Clean CARFAX: Yes
One Owner: Yes
Pictures:
https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80
https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80
https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80
Features: M Sport Differential, Harman Kardon Surround Sound, Head-Up Display, Shadowline Package, Adaptive M Suspension, Wireless Apple CarPlay / Android Auto, 360 Parking Assistant Plus
Description: Immaculate executive sports sedan featuring BMW M-Performance engineering. Complete dealer service documentation from new, brand new Michelin Pilot Sport tires, and full factory warranty balance remaining.

=======================================================
VEHICLE 2: 2024 Porsche Macan GTS
=======================================================
Price: $72,500
Original Price: $76,900
Special Deal: Yes
Special Badge: Manager's Exotic Special
Mileage: 11,200 miles
Body Style: SUV
Exterior Color: Chalk
Interior Color: Black Full Leather with Carmine Red Stitching
Engine: 2.9L Twin-Turbo V6 (434 hp)
Transmission: 7-Speed Porsche Doppelkupplung (PDK)
Drivetrain: All-Wheel Drive
Fuel Type: Gas
MPG: 17 City / 22 Hwy
VIN: WP1AA2AY9RLB19832
Clean CARFAX: Yes
One Owner: Yes
Pictures:
https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80
https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80
Features: Sport Chrono Package with Mode Switch, 21-inch RS Spyder Design Wheels, Porsche Active Suspension Management (PASM), BOSE Surround Sound, Panoramic Roof System, 14-Way Power Sport Seats with Memory
Description: Rare Chalk GTS specification with high-performance sport exhaust and Launch Control. Driven exclusively in fair weather and kept in a climate-controlled private garage.

=======================================================
VEHICLE 3: 2022 Mercedes-Benz E 450 4MATIC All-Terrain Wagon
=======================================================
Price: $49,800
Original Price: $53,200
Special Deal: No
Mileage: 28,600 miles
Body Style: Sedan
Exterior Color: Selenite Grey Magno Matte
Interior Color: Macchiato Beige Nappa Leather
Engine: 3.0L Turbo Inline-6 with EQ Boost Mild Hybrid (362 hp)
Transmission: 9G-TRONIC 9-Speed Automatic
Drivetrain: 4MATIC All-Wheel Drive
Fuel Type: Hybrid
MPG: 21 City / 28 Hwy
VIN: 4JGC6BB7NA384729
Clean CARFAX: Yes
One Owner: Yes
Pictures:
https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80
https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80
Features: AIR BODY CONTROL Air Suspension, Burmester 3D Surround Sound, Driver Assistance Package with Active Steering Assist, MBUX Dual 12.3" High-Res Screens, Ventilated Massage Front Seats
Description: The pinnacle of luxury touring capability. Combines air suspension serenity with rugged trail readiness and Mercedes-Benz flagship safety systems.

=======================================================
VEHICLE 4: 2023 Ford F-150 Lightning Lariat 4WD
=======================================================
Price: $54,995
Original Price: $59,900
Special Deal: Yes
Special Badge: EV Tax Credit Eligible - $4,900 Off
Mileage: 14,800 miles
Body Style: Truck
Exterior Color: Antimatter Blue Metallic
Interior Color: Medium Dark Slate Leather
Engine: Dual Electric Motors Extended Range (580 hp / 775 lb-ft)
Transmission: Single-Speed Automatic
Drivetrain: 4WD
Fuel Type: Electric
MPG: 78 MPGe City / 63 MPGe Hwy (320 mi Range)
VIN: 1FT6W1EV4PW648210
Clean CARFAX: Yes
One Owner: Yes
Pictures:
https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=1200&q=80
https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80
Features: 9.6kW Pro Power Onboard Generator, 15.5-inch SYNC 4A Screen, Ford Co-Pilot360 Active 2.0 BlueCruise Hands-Free Driving, Mega Power Frunk with 400L Storage, Twin-Panel Moonroof, Max Trailer Tow Package
Description: The ultimate dual-purpose workhorse and electric road-tripper. Includes Ford Charge Station Pro (80-amp home charger) and clean title with full battery health test score of 99.4%.

=======================================================
VEHICLE 5: 2022 Audi RS5 Sportback Quattro
=======================================================
Price: $58,900
Original Price: $63,000
Special Deal: Yes
Special Badge: Price Dropped $4,100 Today
Mileage: 22,300 miles
Body Style: Coupe
Exterior Color: Nardo Gray
Interior Color: Black Fine Nappa with Rock Gray Honeycomb Stitching
Engine: 2.9L Bi-Turbo TFSI V6 (444 hp / 442 lb-ft)
Transmission: 8-Speed Tiptronic Sport Automatic
Drivetrain: Quattro Permanent AWD with Sport Rear Differential
Fuel Type: Gas
MPG: 18 City / 25 Hwy
VIN: WAUC4AF56NA019284
Clean CARFAX: Yes
One Owner: Yes
Pictures:
https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80
https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80
Features: Dynamic Plus Package (174 mph limiter), Carbon Fiber Exterior Mirrors & Spoiler, Bang & Olufsen 3D Sound System with 19 Speakers, Audi Virtual Cockpit with RS Track Display, Sport Exhaust
Description: Iconic Nardo Gray RS5 Sportback providing supercar acceleration (0-60 in 3.7 seconds) and four-door practicality. Factory ceramic coating applied.

=======================================================
VEHICLE 6: 2023 Lexus RX 350h Luxury AWD
=======================================================
Price: $46,450
Original Price: $48,900
Special Deal: No
Mileage: 21,500 miles
Body Style: SUV
Exterior Color: Eminent White Pearl
Interior Color: Palomino Semi-Aniline Leather with Ash Bamboo Wood
Engine: 2.5L 4-Cylinder Hybrid Synergy Drive (246 hp)
Transmission: Electronic Continuously Variable Transmission (eCVT)
Drivetrain: E-Four All-Wheel Drive
Fuel Type: Hybrid
MPG: 37 City / 34 Hwy
VIN: 2T2BAMCA2PC084721
Clean CARFAX: Yes
One Owner: Yes
Pictures:
https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80
https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80
Features: 14-inch Lexus Interface Touchscreen, Mark Levinson 21-Speaker PurePlay Audio, Panoramic View Monitor, Traffic Jam Assist, Power Folding & Reclining Heated Rear Seats, Triple-Beam LED Headlights
Description: Outstanding hybrid luxury SUV providing effortless quiet cruising and stellar 36 MPG fuel economy. Fresh oil service and multipoint dealer inspection completed.

=======================================================
VEHICLE 7: 2024 Chevrolet Corvette Stingray 2LT Coupe
=======================================================
Price: $67,900
Original Price: $71,500
Special Deal: Yes
Special Badge: Weekend Flash Special
Mileage: 6,800 miles
Body Style: Coupe
Exterior Color: Rapid Blue
Interior Color: Jet Black Mulan Leather with Blue Accents
Engine: 6.2L LT2 Small Block V8 Mid-Engine (495 hp)
Transmission: 8-Speed Dual-Clutch Tremec Transmission
Drivetrain: Rear-Wheel Drive
Fuel Type: Gas
MPG: 16 City / 24 Hwy
VIN: 1G1YB2D45R5102938
Clean CARFAX: Yes
One Owner: Yes
Pictures:
https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80
https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80
Features: Z51 Performance Package (Brembo brakes, performance suspension, performance exhaust), Performance Data & Video Recorder, Bose Performance 14-Speaker Audio, Front Lift with Memory, GT2 Bucket Seats
Description: American mid-engine masterpiece in eye-catching Rapid Blue. Barely broken in with only 6,800 highway miles. Always stored in garage under breathable custom cover.

=======================================================
VEHICLE 8: 2023 Toyota Tundra TRD Pro CrewMax 4x4
=======================================================
Price: $57,800
Original Price: $61,200
Special Deal: No
Mileage: 25,100 miles
Body Style: Truck
Exterior Color: Solar Octane Orange
Interior Color: TRD Pro SofTex with Camo Inlays
Engine: i-FORCE MAX 3.4L Twin-Turbo V6 Hybrid (437 hp / 583 lb-ft)
Transmission: 10-Speed Electronically Controlled Automatic
Drivetrain: Part-Time 4WD with Electronically Controlled Locking Rear Differential
Fuel Type: Hybrid
MPG: 18 City / 20 Hwy
VIN: 5TFNC5DB3PX049281
Clean CARFAX: Yes
One Owner: Yes
Pictures:
https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80
https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80
Features: FOX 2.5-inch Internal Bypass QS3 Shocks, Multi-Terrain Monitor with Cameras, 14-inch Toyota Audio Multimedia, Panoramic View Monitor, JBL 12-Speaker Premium Sound, Heritage TOYOTA Grille with Lightbar
Description: Factory-built off-road flagship with hybrid low-end torque and high towing rating. Clean history, no frame rust, never taken on hard rock crawling trails.
`;

export function parseGoogleDocInventory(rawText: string): Vehicle[] {
  if (!rawText || typeof rawText !== 'string') return [];

  const vehicles: Vehicle[] = [];
  // Split by vehicle headers or separators
  const sections = rawText.split(/(?:={4,}|VEHICLE\s+\d+:|---{3,})/i).filter(s => s.trim().length > 30);

  let counter = 1;
  for (const sec of sections) {
    const lines = sec.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) continue;

    let year = 2023;
    let make = "Pre-Owned";
    let model = "Vehicle";
    let trim = "";
    let price = 29990;
    let originalPrice: number | undefined = undefined;
    let mileage = 25000;
    let pictures: string[] = [];
    let vin = `1BDA${Math.floor(1000000000000 + Math.random() * 9000000000000)}`;
    let bodyStyle: Vehicle['bodyStyle'] = 'Sedan';
    let exteriorColor = 'Diamond Metallic';
    let interiorColor = 'Black Leather';
    let engine = '2.0L Turbo 4-Cylinder';
    let transmission = 'Automatic';
    let drivetrain = 'AWD';
    let fuelType: Vehicle['fuelType'] = 'Gas';
    let mpg = '24 City / 32 Hwy';
    let isSpecial = false;
    let specialTag: string | undefined = undefined;
    let features: string[] = [];
    let description = "Quality certified pre-owned vehicle from Blue Diamon Auto.";
    let cleanCarfax = true;
    let oneOwner = true;

    // Scan first line or "Vehicle:" line for Year Make Model
    for (const line of lines) {
      const lower = line.toLowerCase();

      // Vehicle header like "2023 BMW M340i xDrive Sedan"
      if (lower.startsWith('vehicle') || lower.includes('20') || lower.includes('sedan') || lower.includes('suv') || lower.includes('truck')) {
        const titleMatch = line.match(/(?:vehicle\s*\d*[:\s-]*)?((?:19|20)\d{2})\s+([A-Za-z0-9-]+)\s+(.+)/i);
        if (titleMatch) {
          year = parseInt(titleMatch[1], 10);
          make = titleMatch[2];
          const rest = titleMatch[3].trim();
          model = rest;
          // deduce body style if mentioned
          if (/suv/i.test(rest)) bodyStyle = 'SUV';
          else if (/truck/i.test(rest)) bodyStyle = 'Truck';
          else if (/coupe/i.test(rest)) bodyStyle = 'Coupe';
          else if (/convertible/i.test(rest)) bodyStyle = 'Convertible';
          else if (/hatchback/i.test(rest)) bodyStyle = 'Hatchback';
          else if (/sedan/i.test(rest)) bodyStyle = 'Sedan';
        }
      }

      // Price extraction
      if (lower.startsWith('price:') || lower.startsWith('price')) {
        const priceNum = line.replace(/[^0-9]/g, '');
        if (priceNum) {
          price = parseInt(priceNum, 10);
        }
      }

      // Original Price
      if (lower.includes('original price') || lower.includes('was:') || lower.includes('msrp:')) {
        const origNum = line.replace(/[^0-9]/g, '');
        if (origNum) {
          originalPrice = parseInt(origNum, 10);
        }
      }

      // Special
      if (lower.includes('special deal:') || lower.includes('special:') || lower.includes('is special:')) {
        if (/yes|true|deal|badge/i.test(line)) {
          isSpecial = true;
        }
      }

      if (lower.includes('special badge:') || lower.includes('special tag:') || lower.includes('badge:')) {
        const tag = line.split(/badge:|tag:/i)[1]?.trim();
        if (tag) {
          specialTag = tag;
          isSpecial = true;
        }
      }

      // Mileage
      if (lower.includes('mileage:') || lower.includes('miles:')) {
        const milesNum = line.replace(/[^0-9]/g, '');
        if (milesNum) {
          mileage = parseInt(milesNum, 10);
        }
      }

      // Pictures / Images
      if (lower.includes('pictures:') || lower.includes('images:') || lower.includes('photo:')) {
        const urlMatches = line.match(/https?:\/\/[^\s"',]+/g);
        if (urlMatches) {
          pictures.push(...urlMatches);
        }
      } else if (line.trim().startsWith('http://') || line.trim().startsWith('https://')) {
        const urlMatches = line.match(/https?:\/\/[^\s"',]+/g);
        if (urlMatches) {
          pictures.push(...urlMatches);
        }
      }

      // VIN
      if (lower.startsWith('vin:') || lower.includes('vin :')) {
        const v = line.split(/vin\s*[:=]/i)[1]?.trim();
        if (v && v.length >= 10) vin = v.toUpperCase();
      }

      // Body Style
      if (lower.includes('body style:') || lower.includes('body:')) {
        const val = line.split(/body(?: style)?\s*[:=]/i)[1]?.trim();
        if (val) {
          if (/suv/i.test(val)) bodyStyle = 'SUV';
          else if (/truck/i.test(val)) bodyStyle = 'Truck';
          else if (/coupe/i.test(val)) bodyStyle = 'Coupe';
          else if (/convertible/i.test(val)) bodyStyle = 'Convertible';
          else if (/hatchback/i.test(val)) bodyStyle = 'Hatchback';
          else bodyStyle = 'Sedan';
        }
      }

      // Colors
      if (lower.includes('exterior color:') || lower.includes('exterior:')) {
        exteriorColor = line.split(/exterior(?: color)?\s*[:=]/i)[1]?.trim() || exteriorColor;
      }
      if (lower.includes('interior color:') || lower.includes('interior:')) {
        interiorColor = line.split(/interior(?: color)?\s*[:=]/i)[1]?.trim() || interiorColor;
      }

      // Engine & Transmission
      if (lower.includes('engine:')) {
        engine = line.split(/engine\s*[:=]/i)[1]?.trim() || engine;
      }
      if (lower.includes('transmission:')) {
        transmission = line.split(/transmission\s*[:=]/i)[1]?.trim() || transmission;
      }
      if (lower.includes('drivetrain:') || lower.includes('drive:')) {
        drivetrain = line.split(/drive(?:train)?\s*[:=]/i)[1]?.trim() || drivetrain;
      }

      // Fuel
      if (lower.includes('fuel type:') || lower.includes('fuel:')) {
        const f = line.split(/fuel(?: type)?\s*[:=]/i)[1]?.trim();
        if (f) {
          if (/electric|ev/i.test(f)) fuelType = 'Electric';
          else if (/hybrid/i.test(f)) fuelType = 'Hybrid';
          else if (/diesel/i.test(f)) fuelType = 'Diesel';
          else fuelType = 'Gas';
        }
      }

      // MPG
      if (lower.includes('mpg:')) {
        mpg = line.split(/mpg\s*[:=]/i)[1]?.trim() || mpg;
      }

      // Features
      if (lower.includes('features:')) {
        const featText = line.split(/features\s*[:=]/i)[1]?.trim();
        if (featText) {
          features = featText.split(/[,;|]/).map(f => f.trim()).filter(Boolean);
        }
      }

      // Description
      if (lower.includes('description:')) {
        description = line.split(/description\s*[:=]/i)[1]?.trim() || description;
      }

      // CARFAX / One Owner
      if (lower.includes('clean carfax:')) {
        cleanCarfax = /yes|true|clean/i.test(line);
      }
      if (lower.includes('one owner:')) {
        oneOwner = /yes|true|1/i.test(line);
      }
    }

    // Default image if none provided
    if (pictures.length === 0) {
      pictures = [
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1200&q=80"
      ];
    }

    // Clean features fallback
    if (features.length === 0) {
      features = [
        "Blue Diamon 160-Point Certified Inspection",
        "Clean Title & CARFAX Verified",
        "Factory Navigation & Backup Camera",
        "Keyless Entry & Push-to-Start",
        "Bluetooth Hands-Free Streaming",
        "Bluetooth & Apple CarPlay"
      ];
    }

    const id = `veh-${counter++}-${make.toLowerCase()}-${year}`;
    vehicles.push({
      id,
      year,
      make,
      model,
      trim,
      price,
      originalPrice,
      mileage,
      pictures,
      vin,
      bodyStyle,
      exteriorColor,
      interiorColor,
      engine,
      transmission,
      drivetrain,
      fuelType,
      mpg,
      isSpecial,
      specialTag: specialTag || (isSpecial ? "Special Deal" : undefined),
      features,
      description,
      cleanCarfax,
      oneOwner,
      status: 'Available'
    });
  }

  return vehicles;
}

export const INITIAL_VEHICLES: Vehicle[] = parseGoogleDocInventory(SAMPLE_GOOGLE_DOC_TEXT);
