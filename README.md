# Simple Carousel that loops through some images

You can use it with a raspberry pi in fullscreen mode to display some images.

### Shop specific content
It is possible to show specific content in different shops. Therefore you need to the `shop` url param. E.g. `?shop=SPE-Schwentinental`.
This can happen either manual for through the `setup.html` file. The latter to work you need to set the `BASE_URL` inside `setup.js` to an API endpoint that returns a list of shops:

```json
{"shops":[
  "Zentrale",
  "SPE-Kiel",
  "SPE-Schwentinental",
  "SPE-Lübeck",
  "SPE-Rendsburg",
  "SPE-Itzehoe"
  ]}
```

After the url is set you can set the `data-shop` attribute inside the html:

```html
<div class="hidden" data-shop="<TARGET_SHOP_NAME>">
  <img src="PATH_TO_SOME_IMAGE">
</div>
```

If both the shop url **and** a `data-sho` attribute is set, the image will **not be shown**.

### Break Mode
There is also a break mode. Therefore you can set the **shop** url query parameter to some shop and save this url.

The raspi will then query some API every **15** seconds and check if it should display a countdown.

For this to work you need to provide the data via JSON. 

The Raspi expects then queries that API. It expects the following JSON:

```json
{
  "last_break": {
    "created_at": "2020-08-02T16:34:09.681096",
    "duration": 1800,
    "is_over": false,
    "shop": "<YOUR_SHOP_NAME>",
    "until": "2020-08-02T17:04:09.681096"
  },
  "shop": "<YOUR_SHOP_NAME>"
}
```

where `<YOUR_SHOP_NAME>` is the name that you set in the url query param.

Adjust `utils.js` and set the `BASE_URL` according to your setup.
