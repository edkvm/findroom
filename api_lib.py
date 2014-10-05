import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'libs'))
from bs4 import BeautifulSoup
import urllib2
import logging
import json

logging.basicConfig(level=logging.DEBUG)


class ListParser(object):
    base_url = "http://{0}.craigslist.org"
    
    def __init__(self, location):
        self.location = location
    
    
    def page_fetcher(self, page_url):
        
        logging.debug(page_url)
        # build request
        req = urllib2.Request(url= page_url)

        # get document
        html_doc = urllib2.urlopen(req)   
        
        # parse document
        soup = BeautifulSoup(html_doc)

        return soup

    def parse_text(self, node, elm, cls, attr=None):
        raw_text = node.find(elm, cls)
        text = ""
        
        # Verify that the element exists
        if raw_text is not None: 
            text = raw_text.string
            if attr is not None:
                text = raw_text[attr]

        return text

    def listing_url(self):
        return self.base_url.format(self.location)
    
    def build_listing(self, node):
        
        url = self.listing_url()
        url = url + self.parse_text(node, "a", "hdrlnk", "href")
            
    
        raw_inner_page = self.page_fetcher(url)

        raw_replylink = raw_inner_page.find("a", id="replylink")
        mailto_link = ""

        if raw_replylink is not None:
            
            reply_link = raw_replylink['href']
            raw_inner_reply_page = self.page_fetcher(self.listing_url() + reply_link)

            raw_mailto = raw_inner_reply_page.find("a", class_="mailto")
            
            if raw_mailto is not None:
                mailto_link = raw_mailto.string.strip()

        if self.parse_text(node, "span", "maptag") is not None:
            
            raw_map_div  = raw_inner_page.find("div", id="map")
            lng = -1
            lat = -1
            if raw_map_div is not None:
                lng = raw_map_div["data-longitude"]
                lat = raw_map_div["data-latitude"]


        json = {
            'title': self.parse_text(node, "a","hdrlnk"),
            'price': self.parse_text(node, "span", "price"),
            'email': mailto_link,
            'link': url,
            'lng': lng,
            'lat': lat 
        }

        return json

    def get_list(self, sub_location, section):
        
        url = self.listing_url() + "/search" + "/" + sub_location + "/" + section
        
        soupe = self.page_fetcher(url)

        raw_apartments = soupe.find_all("p", class_="row")

        apartments = []

        for raw_apartment in raw_apartments:
            
            apartment = self.build_listing(raw_apartment)

            logging.debug(apartment)
            if apartment is not None:
                apartments.append(apartment)
            else:
                logging.error("Failed to parse listing, Dump:{0}", raw_apartment) 
            
        
        return apartments


if __name__ == "__main__":
    
    parser = ListParser("newyork")

    apt_list = parser.get_list("brk","sub")

    print json.dumps(apt_list)



    