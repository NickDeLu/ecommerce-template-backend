'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ecomapi documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-d3806f70ad61a6e423ea96f2a8fc1747f0f1e0a14487941baf25875fd8555093a45cac04fdaaeb1528db909985a1c65eabc0257a93362b9315c8d4dca0876c16"' : 'data-target="#xs-controllers-links-module-AppModule-d3806f70ad61a6e423ea96f2a8fc1747f0f1e0a14487941baf25875fd8555093a45cac04fdaaeb1528db909985a1c65eabc0257a93362b9315c8d4dca0876c16"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-d3806f70ad61a6e423ea96f2a8fc1747f0f1e0a14487941baf25875fd8555093a45cac04fdaaeb1528db909985a1c65eabc0257a93362b9315c8d4dca0876c16"' :
                                            'id="xs-controllers-links-module-AppModule-d3806f70ad61a6e423ea96f2a8fc1747f0f1e0a14487941baf25875fd8555093a45cac04fdaaeb1528db909985a1c65eabc0257a93362b9315c8d4dca0876c16"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-d3806f70ad61a6e423ea96f2a8fc1747f0f1e0a14487941baf25875fd8555093a45cac04fdaaeb1528db909985a1c65eabc0257a93362b9315c8d4dca0876c16"' : 'data-target="#xs-injectables-links-module-AppModule-d3806f70ad61a6e423ea96f2a8fc1747f0f1e0a14487941baf25875fd8555093a45cac04fdaaeb1528db909985a1c65eabc0257a93362b9315c8d4dca0876c16"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-d3806f70ad61a6e423ea96f2a8fc1747f0f1e0a14487941baf25875fd8555093a45cac04fdaaeb1528db909985a1c65eabc0257a93362b9315c8d4dca0876c16"' :
                                        'id="xs-injectables-links-module-AppModule-d3806f70ad61a6e423ea96f2a8fc1747f0f1e0a14487941baf25875fd8555093a45cac04fdaaeb1528db909985a1c65eabc0257a93362b9315c8d4dca0876c16"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-a7ea0ce4fc1e5d25e480a6576f3d08c66403407dc425ee8d8262b3f052dbbce98498bd40b4ca67674e71eab7b42f45556313161b14b4dd06e50742bf9ff2aa65"' : 'data-target="#xs-controllers-links-module-AuthModule-a7ea0ce4fc1e5d25e480a6576f3d08c66403407dc425ee8d8262b3f052dbbce98498bd40b4ca67674e71eab7b42f45556313161b14b4dd06e50742bf9ff2aa65"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-a7ea0ce4fc1e5d25e480a6576f3d08c66403407dc425ee8d8262b3f052dbbce98498bd40b4ca67674e71eab7b42f45556313161b14b4dd06e50742bf9ff2aa65"' :
                                            'id="xs-controllers-links-module-AuthModule-a7ea0ce4fc1e5d25e480a6576f3d08c66403407dc425ee8d8262b3f052dbbce98498bd40b4ca67674e71eab7b42f45556313161b14b4dd06e50742bf9ff2aa65"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-a7ea0ce4fc1e5d25e480a6576f3d08c66403407dc425ee8d8262b3f052dbbce98498bd40b4ca67674e71eab7b42f45556313161b14b4dd06e50742bf9ff2aa65"' : 'data-target="#xs-injectables-links-module-AuthModule-a7ea0ce4fc1e5d25e480a6576f3d08c66403407dc425ee8d8262b3f052dbbce98498bd40b4ca67674e71eab7b42f45556313161b14b4dd06e50742bf9ff2aa65"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-a7ea0ce4fc1e5d25e480a6576f3d08c66403407dc425ee8d8262b3f052dbbce98498bd40b4ca67674e71eab7b42f45556313161b14b4dd06e50742bf9ff2aa65"' :
                                        'id="xs-injectables-links-module-AuthModule-a7ea0ce4fc1e5d25e480a6576f3d08c66403407dc425ee8d8262b3f052dbbce98498bd40b4ca67674e71eab7b42f45556313161b14b4dd06e50742bf9ff2aa65"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtRefreshStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtRefreshStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-MailModule-67afe253e0e70604bf825178e0410da22d79d8f2ebc9d9be942e634f6df21df263302699652c7fb848118cc39d50aae2f950a01268f1ccfa88a0ec3827cb45fc"' : 'data-target="#xs-injectables-links-module-MailModule-67afe253e0e70604bf825178e0410da22d79d8f2ebc9d9be942e634f6df21df263302699652c7fb848118cc39d50aae2f950a01268f1ccfa88a0ec3827cb45fc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-67afe253e0e70604bf825178e0410da22d79d8f2ebc9d9be942e634f6df21df263302699652c7fb848118cc39d50aae2f950a01268f1ccfa88a0ec3827cb45fc"' :
                                        'id="xs-injectables-links-module-MailModule-67afe253e0e70604bf825178e0410da22d79d8f2ebc9d9be942e634f6df21df263302699652c7fb848118cc39d50aae2f950a01268f1ccfa88a0ec3827cb45fc"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-42f621bd078767ce3774e09d664f980989c598122643e4e0f442d4bc3ecaa91f0a394718a7c2189c3b946b3ef7a33b29aeb6af7e7d3ea3a1b8cb69ced84ae7d2"' : 'data-target="#xs-controllers-links-module-UserModule-42f621bd078767ce3774e09d664f980989c598122643e4e0f442d4bc3ecaa91f0a394718a7c2189c3b946b3ef7a33b29aeb6af7e7d3ea3a1b8cb69ced84ae7d2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-42f621bd078767ce3774e09d664f980989c598122643e4e0f442d4bc3ecaa91f0a394718a7c2189c3b946b3ef7a33b29aeb6af7e7d3ea3a1b8cb69ced84ae7d2"' :
                                            'id="xs-controllers-links-module-UserModule-42f621bd078767ce3774e09d664f980989c598122643e4e0f442d4bc3ecaa91f0a394718a7c2189c3b946b3ef7a33b29aeb6af7e7d3ea3a1b8cb69ced84ae7d2"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-42f621bd078767ce3774e09d664f980989c598122643e4e0f442d4bc3ecaa91f0a394718a7c2189c3b946b3ef7a33b29aeb6af7e7d3ea3a1b8cb69ced84ae7d2"' : 'data-target="#xs-injectables-links-module-UserModule-42f621bd078767ce3774e09d664f980989c598122643e4e0f442d4bc3ecaa91f0a394718a7c2189c3b946b3ef7a33b29aeb6af7e7d3ea3a1b8cb69ced84ae7d2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-42f621bd078767ce3774e09d664f980989c598122643e4e0f442d4bc3ecaa91f0a394718a7c2189c3b946b3ef7a33b29aeb6af7e7d3ea3a1b8cb69ced84ae7d2"' :
                                        'id="xs-injectables-links-module-UserModule-42f621bd078767ce3774e09d664f980989c598122643e4e0f442d4bc3ecaa91f0a394718a7c2189c3b946b3ef7a33b29aeb6af7e7d3ea3a1b8cb69ced84ae7d2"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/RoleEntity.html" data-type="entity-link" >RoleEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserEntity.html" data-type="entity-link" >UserEntity</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestWithUserDto.html" data-type="entity-link" >RequestWithUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/VerifyUserDto.html" data-type="entity-link" >VerifyUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtRefreshStrategy.html" data-type="entity-link" >JwtRefreshStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});