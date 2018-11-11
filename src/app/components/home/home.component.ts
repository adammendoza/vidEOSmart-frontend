import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { EosService } from '../../services/eos.service';
declare var jQuery: any;

@Component({
  selector: 'vs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  showNewUserEmailMessage = false;
  username: string;
  usernameSubscription: Subscription;

  constructor(private route: ActivatedRoute, private eosService: EosService, public toastr: ToastrService) {}

  ngOnInit() {
    this.sliderMain();
    this.tabs();
    this.offcanvas();
    this.contentWayPoint();
    this.mobileMenuOutsideClick();
    this.fullHeight();
    this.counter();
    this.usernameSubscription = this.eosService.navItemUsername$.subscribe(username => (this.username = username));
    this.route.params.subscribe((params: Params) => {
      this.showNewUserEmailMessage = params['new'] ? true : false;
    });
  }

  ngOnDestroy() {
    if (this.usernameSubscription) {
      this.usernameSubscription.unsubscribe();
    }
  }

  private sliderMain() {
    jQuery('#videosmart-hero .flexslider').flexslider({
      animation: 'fade',
      slideshowSpeed: 5000,
      directionNav: true,
      start: function() {
        setTimeout(function() {
          jQuery('.slider-text').removeClass('animated fadeInUp');
          jQuery('.flex-active-slide')
            .find('.slider-text')
            .addClass('animated fadeInUp');
        }, 500);
      },
      before: function() {
        setTimeout(function() {
          jQuery('.slider-text').removeClass('animated fadeInUp');
          jQuery('.flex-active-slide')
            .find('.slider-text')
            .addClass('animated fadeInUp');
        }, 500);
      }
    });

    jQuery('#videosmart-hero .flexslider .slides > li').css('height', jQuery(window).height());
    jQuery(window).resize(function() {
      jQuery('#videosmart-hero .flexslider .slides > li').css('height', jQuery(window).height());
    });
  }

  private tabs() {
    jQuery('#services').css('height', jQuery('.tab-content.active').height() + 600);

    jQuery(window).resize(function() {
      jQuery('#services').css('height', jQuery('.tab-content.active').height() + 600);
    });

    jQuery('.tabs-nav > a').on('click', function(e) {
      const tab = jQuery(this).data('tab');

      jQuery('.tabs-nav > a').removeClass('active');
      jQuery(this).addClass('active');

      jQuery('.tab-content').removeClass('active show');

      setTimeout(function() {
        jQuery('.tab-content[data-tab-content="' + tab + '"]').addClass('active');
        jQuery('#services').css('height', jQuery('.tab-content.active').height() + 600);
      }, 200);

      setTimeout(function() {
        jQuery('.tab-content[data-tab-content="' + tab + '"]').addClass('show');
      }, 400);

      e.preventDefault();
    });
  }

  private fullHeight() {
    if (!this.isMobile()) {
      jQuery('.js-fullheight').css('height', jQuery(window).height() - jQuery('#videosmart-header').height());
      jQuery(window).resize(function() {
        jQuery('.js-fullheight').css('height', jQuery(window).height() - jQuery('#videosmart-header').height());
      });
    }
  }

  private isMobile() {
    return window.innerWidth <= 800 && window.innerHeight <= 600;
  }

  // Offcanvas and cloning of the main menu
  private offcanvas() {
    const jQueryclone = jQuery('#videosmart-menu-wrap').clone();

    jQueryclone.attr({
      id: 'offcanvas-menu'
    });

    jQueryclone.find('> ul').attr({
      class: '',
      id: ''
    });

    jQuery('#videosmart-page').prepend(jQueryclone);

    // click the burger
    jQuery('.js-videosmart-nav-toggle').on('click', function() {
      if (jQuery('body').hasClass('videosmart-offcanvas')) {
        jQuery('body').removeClass('videosmart-offcanvas');
        jQuery(this).removeClass('active');
      } else {
        jQuery('body').addClass('videosmart-offcanvas');
        jQuery(this).addClass('active');
      }
      // jQuery('body').toggleClass('videosmart-offcanvas');
    });

    jQuery('#offcanvas-menu').css('height', jQuery(window).height());

    jQuery(window).resize(function() {
      const w = jQuery(window);

      jQuery('#offcanvas-menu').css('height', w.height());

      if (w.width() > 769) {
        if (jQuery('body').hasClass('videosmart-offcanvas')) {
          jQuery('body').removeClass('videosmart-offcanvas');
        }
      }
    });
  }

  // Click outside of the Mobile Menu
  private mobileMenuOutsideClick() {
    jQuery(document).click(function(e) {
      const container = jQuery('#offcanvas-menu, .js-videosmart-nav-toggle');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if (jQuery('body').hasClass('videosmart-offcanvas')) {
          jQuery('body').removeClass('videosmart-offcanvas');
        }
      }
    });
  }

  private counter() {
    jQuery('.js-counter').countTo({
      formatter: function(value, options) {
        return value.toFixed(options.decimals);
      }
    });
  }

  private contentWayPoint() {
    let i = 0;
    jQuery('.animate-box').waypoint(
      function(direction) {
        if (direction === 'down' && !jQuery(this.element).hasClass('animated')) {
          i++;

          jQuery(this.element).addClass('item-animate');
          setTimeout(function() {
            jQuery('body .animate-box.item-animate').each(function(k) {
              const el = jQuery(this);
              setTimeout(
                function() {
                  el.addClass('fadeInUp animated');
                  el.removeClass('item-animate');
                },
                k * 200,
                'easeInOutExpo'
              );
            });
          }, 100);
        }
      },
      { offset: '85%' }
    );
  }
}
