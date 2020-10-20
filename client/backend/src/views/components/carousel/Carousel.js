/**
 * Created by ivan on 02.07.18.
 */

import React, { Component } from 'react';
import {Swipeable} from 'react-swipeable';
import { Wrapper, Container, Slot, Buttons, Button } from './elements';

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 0,
            direction: 'next',
            sliding: false
        };

        this.nextSlide = this.nextSlide.bind(this);
        this.prevSlide = this.prevSlide.bind(this);
    }

    static getSlotWidth() {
        const cw = document.body.clientWidth;

        if (cw <= 599) return 80;
        if (cw <= 959) return 40;
        if (cw <= 1279) return 30;

        return 20;
    }

    getOrder(itemIndex) {
        const { position } = this.state;
        const { children } = this.props;
        const numItems = children.length || 1;

        return ((numItems + 1) - position + itemIndex) % numItems;
    }

    nextSlide() {
        const { position } = this.state;
        const { children } = this.props;
        const numItems = children.length || 1;

        this.doSliding('next', position === numItems - 1 ? 0 : position + 1);
    }

    prevSlide() {
        const { position } = this.state;
        const { children } = this.props;
        const numItems = children.length;

        this.doSliding('prev', position === 0 ? numItems - 1 : position - 1);
    }

    doSliding(direction, position) {
        this.setState({
            sliding: true,
            direction,
            position
        });

        setTimeout(() => {
            this.setState({
                sliding: false
            });
        }, 50);
    }

    handleSwipe(isNext) {
        isNext ? this.nextSlide() : this.prevSlide();
    }

    render() {
        const { children } = this.props;
        const { sliding, direction } = this.state;

        const isDesktop = !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        const slotWidth = Carousel.getSlotWidth();

        return (
            <div>
                <Swipeable
                    onSwipedLeft={() => this.handleSwipe(true)}
                    onSwipedRight={() => this.handleSwipe()}>
                    <Wrapper>
                        <Container sliding={sliding} direction={direction} slotWidth={slotWidth}>
                            {children.map((child, index) => (
                                <Slot key={child.key} order={this.getOrder(index)}>
                                    {child}
                                </Slot>
                            ))}
                        </Container>
                    </Wrapper>
                </Swipeable>

                {isDesktop
                    ? <Buttons>
                        <Button onClick={this.prevSlide}>&#8592;</Button>
                        <Button onClick={this.nextSlide}>&#8594;</Button>
                    </Buttons>
                    : null}
            </div>
        );
    }
}

export default Carousel;