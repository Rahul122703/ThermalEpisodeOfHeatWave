import geopandas as gpd
import json

# IMD subdivision GeoJSON
url = "https://gist.githubusercontent.com/planemad/d347ad7485344fb0ba4b470721825427/raw/4c683c9e1c46bc7373dc3df34202080e1a69c6e3/india-district-imd.geojson"

gdf = gpd.read_file(url)

# Same region mapping used in your ML pipeline
region_map = {
    "north": [
        "Jammu & Kashmir","Himachal Pradesh","Uttarakhand","Punjab",
        "Har. Chd & Delhi","West Rajasthan","East Rajasthan",
        "East Uttar Pradesh","West Uttar Pradesh"
    ],

    "east": [
        "Bihar","Jharkhand","Gangetic West Bengal","Orissa"
    ],

    "northeast": [
        "Assam & Meghalaya","Arunachal Pradesh","N M M T","Shwb & Sikkim"
    ],

    "central": [
        "West Madhya Pradesh","East Madhya Pradesh","Vidarbha","Chhattisgarh"
    ],

    "west": [
        "Gujarat Region","Saurashtra & Kutch","Konkan & Goa",
        "Madhya Maharashtra","Marathwada"
    ],

    "south": [
        "Coastal Andhra Pradesh","Rayalaseema","Telangana",
        "N. I. Karnataka","S. I. Karnataka","Coastal Karnataka",
        "Kerala","Tamilnadu & Pondichery","A & N Island","Lakshadweep"
    ]
}

# assign region
def assign_region(name):
    for r, subs in region_map.items():
        if name in subs:
            return r
    return None

gdf["region"] = gdf["subdivision"].apply(assign_region)

# remove polygons not mapped
gdf = gdf[gdf["region"].notna()]

# dissolve polygons into regions
regions = gdf.dissolve(by="region")

# reset index
regions = regions.reset_index()

# save GeoJSON
regions.to_file("regions.geojson", driver="GeoJSON")

print("regions.geojson created successfully")