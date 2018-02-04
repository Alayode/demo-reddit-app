import './home.scss';

import { OauthService } from '../../common/services/oauth.service';
import { Credentials } from '../../common/models/credentials.model';
import { RedditService } from '../../common/services/reddit.service';

export class HomeComponent implements ng.IComponentOptions {
    controller: ng.IControllerConstructor;
    template: string;

    constructor() {
        this.controller = HomeController;
        this.template = require('./home.component.html');
    }
}

class HomeController implements ng.IComponentController {

    public credentials: Credentials;
    public subredditCards;

    constructor(private oauthService: OauthService,
                private redditService: RedditService,
                private $location: ng.ILocationService) {
        "ngInject";
    }

    $onInit() {
        this.credentials = this.oauthService.getCredentials();
        if (!this.credentials || this.credentials.is_expired) {
            return this.$location.path('/login');
        }

        // Initialize request for
        this.redditService.getSubreddit()
            .then((data: any) => {
                this.subredditCards = data.data.children;
            });
    }

    public navigateToLink(url) {
        window.location.href = url;
    }

}