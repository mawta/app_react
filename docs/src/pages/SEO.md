---
title: 'SEO'
path: '/seos/'
---


# SEO Scan

## Title
Title tags are displayed on search engine results pages (SERPs) as the clickable headline for a given result, and are important for usability, SEO, and social sharing.
You can edit title in admin store Shopify.

::: tip
The Title should be between 50 to 70 characters, which is something catchy and relevant to the page of the website
:::

## Description
Meta Descriptions are HTML attributes that provide concise summaries of webpages.
You can edit description in admin store Shopify.

::: tip
They commonly appear underneath the blue clickable links in a search engine results page (SERP). Meta Description should be between 150 to 320 characters.
:::

## Headings
Headings are pieces of HTML code that allow you to make certain words stand out on a page. These headings should also contain important keywords and help organize your content into sections, so readers can scan your page and decide if it’s something they’re interested in reading.

::: tip
It can improve your search engine ranking. You can maximum use only one H1 tag. Afterward, you can use multiple H2 to H6 tags.
:::

## Hreflang
If you serve different content based on a user's language or region, use hreflang links to ensure that search engines serve the correct content for that language or region.

### Recommendations
Define an hreflang link for each language version of a URL. Lighthouse flags in your report any incorrect hreflang links that it has found.
Suppose that you have 3 versions of a page:
* An English version at https://example.com
* A Spanish version at https://es.example.com
* A German version at https://de.example.com


Tell search engines that these pages are equivalent by adding link elements to the head of your HTML:

```html
<link rel="alternate" hreflang="en" href="https://example.com" />
<link rel="alternate" hreflang="es" href="https://es.example.com" />
<link rel="alternate" hreflang="de" href="https://de.example.com" />
```
## Canonical Url

When multiple pages have similar content, search engines consider them duplicate versions of the same page. For example, desktop and mobile versions of a product page are considered duplicates. Search engines select one of the pages as the canonical version and crawl that one more, while crawling the other ones less.

Canonical links let you explicitly specify which version to crawl. There are multiple advantages to this:

* You get to specify which URL should appear in search results.
* It helps search engines consolidate multiple URLs into a single, preferred URL. For example, if other sites put query parameters on the ends of links to your page, search engines consolidate those URLs to your preferred version.
* It simplifies tracking methods. Tracking one URL is easier than tracking many.
* It improves the page ranking of syndicated content by consolidating the syndicated links to your original content back to your preferred URL.
* It optimizes crawling time. Time spent crawling duplicate pages is time not spent crawling other pages with truly unique content.

### Recommendations
Example a canonical link element to the head element of your HTML:
```html
<!doctype html>
<html>
  <head>
    ...
    <link rel="canonical" href="https://example.com"/>
    ...
```

## Font Sizes
Font sizes smaller than 12px are often difficult to read on mobile devices, and may require users to pinch-to-zoom in order to display the text at a comfortable reading size.
::: tip
Aim to have a font size of at least 12px on at least 60% of the text on your pages
:::
## Link Descriptions
Link descriptions, which are the clickable words in links, help users and search engines better understand your content.

Replace generic descriptions, such as click here in the example below...

```html
<p>To see all of our basketball videos, <a href="videos.html">click here</a>.</p>
```
## HTTP status code
Search engines may not properly index pages that return unsuccessful HTTP status codes.

When a page is requested, ensure that your server returns a 2XX or 3XX HTTP status code. Search engines may not properly index pages with 4XX or 5XX status codes.
